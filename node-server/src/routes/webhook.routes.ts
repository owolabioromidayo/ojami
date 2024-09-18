
import express, { Request, Response } from "express";
import { GetQueryChargeResponse, RequestWithContext, TransactionStatus } from "../types";
import { Transaction } from "../entities/Transaction";

import { KORAPAY_TOKEN } from "../constants";

const router = express.Router();
const crypto = require('crypto');

const secretKey = process.env.KORAPAY_TOKEN;

router.post("/bank_transfer", paymentWebhookHandler);



async function paymentWebhookHandler(req: Request, res: Response) {

    const hash = crypto.createHmac('sha256', secretKey).update(JSON.stringify(req.body.data)).digest('hex');
    if (hash === req.headers['x-korapay-signature']) {

        const { event, data } = req.body;

        const em = (req as RequestWithContext).em;


        try {

            if (event === 'charge.success') {
                const { reference, currency, amount, fee, status } = data;


                if (status === "success") {
                    let transaction = await em.fork({}).findOneOrFail(Transaction, { id: reference });

                    //REQUERY TRANSACTION

                    const resp = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${KORAPAY_TOKEN}`
                        },
                    });

                    if (!resp.ok) {
                        return res.status(500).json({ errors: [{ message: 'Could not verify transaction' }] });
                    }

                    const data = await resp.json() as GetQueryChargeResponse;


                    if (data.status !== true) {
                        return res.status(500).json({ errors: [{ message: 'Could not verify transaction' }] });
                    }

                    const amount_paid = Number(data.data.amount_paid);
                    const fee = Number(data.data.fee);
                    if (isNaN(amount_paid)) {
                        return res.status(500).json({ errors: [{ message: 'Could not verify transaction. Error in payload verification from payment provider. ' }] });
                    }

                    if (isNaN(fee)) {
                        return res.status(500).json({ errors: [{ message: 'Could not verify transaction. Error in payload verification from payment provider.' }] });
                    }


                    transaction.status = data.data.status as TransactionStatus;
                    transaction.amountPaid = amount_paid;
                    transaction.fee = fee;


                    //TODO: get user virtual account and update their balance with amount

                    await em.fork({}).persistAndFlush(transaction);
                    res.status(200).send('Webhook received successfully');


                } else {

                    //documentation does not explain this case
                    res.status(200).send('Webhook received successfully');

                }


            } else if (event === 'charge.failed') {

                const { reference, currency, amount, fee, status } = data;

                if (status === "success") {
                    let transaction = await em.fork({}).findOneOrFail(Transaction, { id: reference });

                    transaction.status = TransactionStatus.FAILED;
                    await em.fork({}).persistAndFlush(transaction);
                    res.status(200).send('Webhook received successfully');


                } else {
                    //documentation does not explain this case
                    res.status(200).send('Webhook received successfully');
                }

            }
            else {
                res.status(200).send('Event type not handled');
            }
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).send('Error processing webhook');

        }
    }
}

export default router;