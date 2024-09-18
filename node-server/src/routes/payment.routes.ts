import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';


import { CreateVirtualAccountResponse, RequestWithContext, BankTransferResponse } from "../types";
import { User } from "../entities/User";
import { isAuth } from "../middleware/isAuth";

import fetch from 'node-fetch';
import { VirtualAccount } from "../entities/VirtualAccount";
import { Transaction } from "../entities/Transaction";
import { ACCOUNT_NAME, ACCOUNT_REF, BANK_TRANSFER_NOTIFICATION_URL, KORAPAY_TOKEN } from "../constants";

const router = express.Router();





router.post("/virtual_accounts/new", isAuth, createNewVirtualBankAccount);

router.post("/pay_in/bank_transfer", isAuth, receiveBankTransferFromCustomer);

// router.post("/pay_in/card_transfer", isAuth, receiveBankTransferFromCustomer);


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


export default router;