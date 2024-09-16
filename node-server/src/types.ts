import { NextFunction, Request, Response } from 'express';
import { Redis } from 'ioredis';
import { EntityManager } from '@mikro-orm/core';

export interface RequestWithContext extends Request {
    redis: Redis;
    em: EntityManager;
}