import express, { Request, Response } from "express";
import session from 'express-session';
import helmet from 'helmet';
import RedisStore from "connect-redis";
import Redis from "ioredis";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";


import contextMiddleware from './middleware/contextMiddleware';
import { __prod__ } from "./constants";

require("dotenv").config();

import authRoutes from './routes/auth.routes';
import identityRoutes from './routes/identity.routes';
import paymentRoutes from './routes/payment.routes';
import ecommerceRoutes from './routes/ecommerce.routes';
import aiRoutes from './routes/ai.routes';
import webhookRoutes from './routes/webhook.routes';
import { isAuth } from './middleware/isAuth';
import { ProductLink } from "./entities/ProductLink";
import { RequestWithContext } from "./types";

console.log(process.env.NODE_ENV);

var cors = require('cors');



declare module 'express-session' {
  export interface SessionData {
    loadedCount: number;
    userid: number;
  }
} ``

async function resolvePaymentLink(req: Request, res: Response){
    const em = (req as RequestWithContext).em;
    
    const productLink = await em.fork({}).findOneOrFail(ProductLink, { linkId: req.params.id  }, {populate: ["product.id"]});

    res.redirect(`/api/ecommerce/products/${productLink.product.id}`);
}

export const createApp = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const em = orm.em.fork();

  const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

  const redisStore = new RedisStore({
    client: redis,
    prefix: "korahack-server: "
  });

  const app = express();
  
  app.use(contextMiddleware(redis, em));

  app.set("trust proxy", 1);
  app.use(cors({
    credentials: true,
    origin: [`http://localhost:${process.env.PORT || 3000}`, 'https://ojami.shop', 'https://www.ojami.shop']
  }));

  app.use(helmet());
  app.use(express.json());

  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 1024,
      },
    } as any)
  );

  app.get('/oja', (req, res) => {
    res.send('Welcome to the Storefront Marketplace API');
  });

  
  app.use('/oja/api/auth', authRoutes);
  app.use('/oja/api/identity', identityRoutes);
  app.use('/oja/api/ecommerce', ecommerceRoutes);
  app.use('/oja/api/payments', paymentRoutes);
  app.use('/oja/api/webhooks', webhookRoutes);
  app.use('/oja/api/ai', aiRoutes);
  app.get('/oja/p/:id', isAuth, resolvePaymentLink);


  return app; 
}



const startServer = async () => {
  const app = await createApp();
  
  const PORT = process.env.PORT || 4003;
  
  app.listen(PORT, () => {
    console.log(`Server ready on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => console.error(err));
