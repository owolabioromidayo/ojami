import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import RedisStore from "connect-redis";
import Redis from "ioredis";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";


import contextMiddleware from './middleware/contextMiddleware';
import { __prod__ } from "./constants";

require("dotenv").config();

import authRoutes from './routes/authRoutes';

console.log(process.env.NODE_ENV);

var cors = require('cors');



declare module 'express-session' {
  export interface SessionData {
    loadedCount: number;
    userid: number;
  }
} ``

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
    origin: [`http://localhost:${process.env.PORT || 3000}`]
  }));

  app.use(helmet());
  app.use(express.json());

  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      sameSite: "Strict",
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

  app.get('/', (req, res) => {
    res.send('Welcome to the Storefront Marketplace API');
  });
  
  app.use('/api/auth', authRoutes);

  return app; 
}



const startServer = async () => {
  const app = await createApp();
  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server ready on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => console.error(err));
