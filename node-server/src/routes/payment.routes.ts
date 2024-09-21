import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

import QRCode from 'qrcode';


import { CreateVirtualAccountResponse, RequestWithContext, BankTransferResponse } from "../types";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";

import fetch from 'node-fetch';
import { VirtualAccount } from "../entities/VirtualAccount";
import { Transaction } from "../entities/Transaction";
import { ACCOUNT_NAME, ACCOUNT_REF, BANK_TRANSFER_NOTIFICATION_URL, KORAPAY_TOKEN } from "../constants";
import { ProductLink } from "../entities/ProductLink";

const router = express.Router();

const URL_PREFIX = `${process.env.DOMAIN_URL}/p/`





router.post("/virtual_accounts/new", isAuth, createNewVirtualBankAccount);

router.post("/pay_in/bank_transfer", isAuth, receiveBankTransferFromCustomer);

// router.post("/pay_in/card_transfer", isAuth, receiveBankTransferFromCustomer);


router.post("/generate_payment_link", isAuth, generatePaymentLink);



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
        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid  });

        const payload = {
          permanent : true,
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

        if(!resp.ok){
            return res.status(500).json({ errors: [{ message: 'Could not create virtual card' }] });
        }


        const data = await resp.json() as CreateVirtualAccountResponse;
        if (data.status === true){
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


async function receiveBankTransferFromCustomer (req: Request, res: Response) {

    const {  currency  } = req.body;

    const amount = Number(req.body.amount);

    if (isNaN(amount)) {
        return res.status(400).json({ errors: [{ field: 'amount', message: 'Invalid amount' }] });
    }

    const em = (req as RequestWithContext).em;

    try {

        //go through  with original transfer to dynamic virtual account

        const user = await em.fork({}).findOneOrFail(User, { id: req.session.userid  });

        const payload = {
          reference: uuidv4(),
          amount,
          currency,
          notification_url: BANK_TRANSFER_NOTIFICATION_URL ,
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

        if(!resp.ok){
            return res.status(500).json({ errors: [{ message: 'Could not create virtual card' }] });
        }


        const data = await resp.json() as BankTransferResponse;
        if (data.status === true){
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

async function generatePaymentLink(req:Request, res: Response) {
    //right now its just product link

    const {productId} = req.body; 

    if ( !productId ||  isNaN(Number(productId) )) {
        return res.status(400).json({ errors: [{ field: 'productId', message: 'productId is not a number' }] });
    }

    const em = (req as RequestWithContext).em;

    try {
    
        const product = await em.fork({}).findOneOrFail(Product, { id: Number(productId) },  {populate: ['link.shortLink', 'link.qrCode']});

        if (product.link){
            //already exists, return
            return res.status(201).json({ shortLink: product.link.shortLink, qrCode: product.link.qrCode  });
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
            return res.status(201).json({ shortLink, qrCode  });

            }
        }  )



    } catch (err) {
        return res.status(500).json({ errors: [{ message: `Could not fetch product with ID ${productId}.` }] });
    }


}




export default router;