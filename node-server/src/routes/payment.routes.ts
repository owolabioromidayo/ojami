import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import QRCode from 'qrcode';


import { CreateVirtualAccountResponse, RequestWithContext, BankTransferResponse, PendingBalanceStatus } from "../types";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";

import fetch from 'node-fetch';
import { VirtualAccount } from "../entities/VirtualAccount";
import { Transaction } from "../entities/Transaction";
import { ACCOUNT_NAME, ACCOUNT_REF, BANK_TRANSFER_NOTIFICATION_URL, KORAPAY_TOKEN } from "../constants";
import { ProductLink } from "../entities/ProductLink";
import { VirtualTransaction } from "../entities/VirtualTransaction";
import { VirtualWallet } from "../entities/VirtualWallet";
import { PendingBalance } from "../entities/PendingBalance";
import { InstantOrder } from "../entities/InstantOrder";
import { InstantOrderItem } from "../entities/InstantOrderItem";
import { InstantOrderLink } from "../entities/InstantOrderLink";

const router = express.Router();

const URL_PREFIX = `${process.env.DOMAIN_URL}/p/`





router.post("/virtual_accounts/new", isAuth, createNewVirtualBankAccount);

router.post("/pay_in/bank_transfer", isAuth, receiveBankTransferFromCustomer);

// router.post("/pay_in/checkout", isAuth, initializeCheckout);
// router.post("/pay_out/", isAuth, initializeCheckout);


router.post("/make_virtual_payment", isAuth, makeVirtualPayment);

// router.post("/make_virtual_transfer", isAuth, makeVirtualTransfer);

// router.post("/pay_in/card_transfer", isAuth, receiveBankTransferFromCustomer);


router.post("/generate_payment_link_from_product", isAuth, generatePaymentLinkFromProduct);
router.post("/generate_payment_link_from_instant_order", isAuth, generatePaymentLinkFromInstantOrder);

router.get("/pending_balances/calculate", isAuth, calculatePendingBalance);
router.get("/pending_balances", isAuth, getPendingBalances);
router.post("/pending_balances/update", updatePendingBalances);



//create sandbox virtual account
//get virtual account transactions

//payout to bank account

// bank transfer , from customer into korapay



//MOBILE MONEY

//Checkout Redirect, initialize charge?

// payouts? escrow?


// get virtual balance of user account


async function createNewVirtualBankAccount(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {
        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid });

        const payload = {
            permanent: true,
            bank_code: "044", //test
            account_name: ACCOUNT_NAME,
            account_reference: ACCOUNT_REF,
            customer: {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
            }
        };

        const resp = await fetch("https://api.korapay.com/merchant/api/v1/virtual-bank-account", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KORAPAY_TOKEN}`
            },
            body: JSON.stringify(payload),
        });

        if (!resp.ok) {
            return res.status(500).json({ errors: [{ message: 'Could not create virtual card' }] });
        }


        const data = await resp.json() as CreateVirtualAccountResponse;
        if (data.status === true) {
            const newVirtualAccount = new VirtualAccount(data, user);
            await em.fork({}).persistAndFlush(newVirtualAccount);
            return res.status(201).json({ newVirtualAccount });
        } else {
            return res.status(500).json({ errors: [{ status: 'Virtual account create request failed', message: data.message }] });
        }

    } catch (err) {
        return res.status(500).json({ errors: [{ status: 'Virtual account create request failed', message: 'None', error: err }] });
    }
}


async function receiveBankTransferFromCustomer(req: Request, res: Response) {

    const { currency } = req.body;

    const amount = Number(req.body.amount);

    if (isNaN(amount)) {
        return res.status(400).json({ errors: [{ field: 'amount', message: 'Invalid amount' }] });
    }

    const em = (req as RequestWithContext).em;

    try {

        //go through  with original transfer to dynamic virtual account

        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid });

        const payload = {
            reference: uuidv4(),
            amount,
            currency,
            notification_url: BANK_TRANSFER_NOTIFICATION_URL,
            merchant_bears_cost: false,
            customer: {
                name: `${user.firstname} ${user.lastname}`,
                email: user.email,
            }
        };

        const resp = await fetch("https://api.korapay.com/merchant/api/v1/charges/bank-transfer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${KORAPAY_TOKEN}`

            },
            body: JSON.stringify(payload),
        });

        if (!resp.ok) {
            return res.status(500).json({ errors: [{ message: 'Could not create virtual card' }] });
        }


        const data = await resp.json() as BankTransferResponse;
        if (data.status === true) {
            const transaction = new Transaction(data, user);
            await em.fork({}).persistAndFlush(transaction);
            return res.status(201).json({ transaction });
        } else {
            return res.status(500).json({ errors: [{ status: 'Virtual account create request failed', message: data.message }] });
        }


    } catch (err) {
        return res.status(500).json({ errors: [{ status: 'Virtual account create request failed', message: 'None', error: err }] });
    }
}

async function makeVirtualPayment(req: Request, res: Response) {
    const { receivingUserId, orderId, isInstantPurchase } = req.body;

    if (!(typeof isInstantPurchase === 'boolean')) {
        return res.status(400).json({ errors: [{ field: 'isInstantPurchase', message: 'isInstantPurchase is not boolean' }] });
    }

    // if (!amount || isNaN(Number(amount))) {
    //     return res.status(400).json({ errors: [{ field: 'amount', message: 'amount is not a number' }] });
    // }

    if (!receivingUserId || isNaN(Number(receivingUserId))) {
        return res.status(400).json({ errors: [{ field: 'receivingUserId', message: 'sendingUserId is not a number' }] });
    }

    if (!orderId || isNaN(Number(orderId))) {
        return res.status(400).json({ errors: [{ field: 'orderId', message: 'orderId is not a number' }] });
    }



    const em = (req as RequestWithContext).em;

    try {

        //calculate amount from order

        const amount = (await em.fork({}).findOneOrFail(InstantOrder, { id: req.session.userid }, { populate: ['items', 'items.product.price'] })).items
            .getItems().reduce((x: number, curr: InstantOrderItem) => x + (curr.product.price * curr.quantity), 0);


        const sendingUser = await em.fork({}).findOneOrFail(User, { id: req.session.userid }, { populate: ['virtualWallet', 'virtualWallet.balance'] });
        const receivingUser = await em.fork({}).findOneOrFail(User, { id: Number(receivingUserId) }, { populate: ['virtualWallet', 'virtualWallet.balance'] });

        if (sendingUser.virtualWallet.balance < amount) {
            return res.status(400).json({ errors: [{ message: 'Insufficient balance for transaction' }] });
        }

        const virtualTransaction = new VirtualTransaction(sendingUser.virtualWallet, receivingUser.virtualWallet, amount, isInstantPurchase);

        //transfer money between wallets?
        let sendingUser_wallet = await em.fork({}).findOneOrFail(VirtualWallet, { id: sendingUser.virtualWallet.id }, { populate: ['balance'] });
        let receivingUser_wallet = await em.fork({}).findOneOrFail(VirtualWallet, { id: receivingUser.virtualWallet.id }, { populate: ['balance'] });

        if (isInstantPurchase) {
            //transfer the money immediately
            sendingUser_wallet.balance -= amount;

            receivingUser_wallet.balance += amount;

            await em.fork({}).persistAndFlush([virtualTransaction, sendingUser_wallet, receivingUser_wallet]);
            return res.status(200).json({ virtualTransaction })

        }
        // delayed purchases
        // create a new pending balance (default time is 7 days)
        sendingUser_wallet.balance -= amount;
        const pendingBalance = new PendingBalance(sendingUser_wallet, receivingUser_wallet, amount);


        await em.fork({}).persistAndFlush([pendingBalance, virtualTransaction, sendingUser_wallet, receivingUser_wallet]);




    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Transaction failed` }] });
    }



}

async function calculatePendingBalance(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {

        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid }, { populate: ['virtualWallet.pendingBalances', 'virtualWallet.balance'] });
        const pendingBalances = user.virtualWallet.pendingBalances.getItems().filter(x => x.status === PendingBalanceStatus.PENDING);

        let _pendingBalance: number = pendingBalances.reduce((x: number, curr: PendingBalance) => x + curr.amount, 0);


        return res.status(200).json({ pendingBalance: _pendingBalance });

    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not retrieve pending balance.` }] });
    }



}

async function updatePendingBalances(req: Request, res: Response) {
    //go through all pending balances, if theyre past the resolution period, resolve them and update status

    const em = (req as RequestWithContext).em;

    try {

        let currDate = new Date();

        const pendingBalances = await em.fork({}).find(PendingBalance, {
            status: PendingBalanceStatus.PENDING,
            resolvesAt: { $lte: currDate },

        }, { populate: ['receivingWallet'] });


        for (let pendingBalance of pendingBalances) {
            pendingBalance.status = PendingBalanceStatus.COMPLETED;
            const receivingUser_wallet = await em.fork({}).findOneOrFail(VirtualWallet, { id: pendingBalance.receivingWallet.id });
            receivingUser_wallet.balance += pendingBalance.amount;

            await em.fork({}).persistAndFlush([pendingBalance, receivingUser_wallet]);

        }

        return res.status(200).json({ message: "Äll pending balances updated successfully!" });

    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not update pending balances.` }] });
    }

}

async function getPendingBalances(req: Request, res: Response) {

    const em = (req as RequestWithContext).em;

    try {

        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid }, { populate: ['virtualWallet.pendingBalances'] });
        const pendingBalances = user.virtualWallet.pendingBalances.getItems();
        return res.status(200).json({ pendingBalances: pendingBalances });

    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not retrieve pending balances.` }] });
    }


}


async function generatePaymentLinkFromProduct(req: Request, res: Response) {
    //right now its just product link

    const { productId } = req.body;

    if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ errors: [{ field: 'productId', message: 'productId is not a number' }] });
    }

    const em = (req as RequestWithContext).em;

    try {

        const product = await em.fork({}).findOneOrFail(Product, { id: Number(productId) }, { populate: ['link.shortLink', 'link.qrCode'] });

        if (product.link) {
            //already exists, return
            return res.status(201).json({ shortLink: product.link.shortLink, qrCode: product.link.qrCode });
        }

        //generate new link and QR code


        const linkId: string = uuidv4();
        const shortLink: string = `${URL_PREFIX}${linkId}`;

        QRCode.toDataURL(shortLink, async (err, url) => {
            if (err) {
                return res.status(500).json({ errors: [{ message: "Could not generate QR code." }] });
            } else {
                const qrCode = url;
                const productLink = new ProductLink(linkId, shortLink, qrCode, product);
                await em.fork({}).persistAndFlush(productLink);
                return res.status(201).json({ shortLink, qrCode });

            }
        })



    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not fetch product with ID ${productId}.` }] });
    }


}

async function generatePaymentLinkFromInstantOrder(req: Request, res: Response) {
    //right now its just product link

    const { instantOrderId } = req.body;

    if (!instantOrderId || isNaN(Number(instantOrderId))) {
        return res.status(400).json({ errors: [{ field: 'instantOrderid', message: 'instantOrderId is not valid' }] });
    }

    const em = (req as RequestWithContext).em;

    try {

        const order = await em.fork({}).findOneOrFail(InstantOrder, { id: Number(instantOrderId) }, { populate: ['link.shortLink', 'link.qrCode'] });

        if (order.link) {
            //already exists, return
            return res.status(201).json({ shortLink: order.link.shortLink, qrCode: order.link.qrCode });
        }

        //generate new link and QR code


        const linkId: string = uuidv4();
        const shortLink: string = `${URL_PREFIX}${linkId}`;

        QRCode.toDataURL(shortLink, async (err, url) => {
            if (err) {
                return res.status(500).json({ errors: [{ message: "Could not generate QR code." }] });
            } else {
                const qrCode = url;
                const orderLink = new InstantOrderLink(linkId, shortLink, qrCode, order);
                await em.fork({}).persistAndFlush(orderLink);
                return res.status(201).json({ shortLink, qrCode });

            }
        })



    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not fetch product with ID ${instantOrderId}.` }] });
    }


}




export default router;