import { NextFunction, Request, Response } from "express";

import {
  IRateLimiterStoreOptions,
  RateLimiterRedis,
} from "rate-limiter-flexible";

import redis from "redis";
const client = redis.createClient(process.env.REDIS_PORT as any || 6379);

const opts: IRateLimiterStoreOptions = {
  storeClient: client,
  points: 30,
  duration: 60,
};

const rateLimiter = new RateLimiterRedis(opts);

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.id ? req.id : req.ip;
  const pointsToConsume = req.id
    ? (process.env.REGISTERED_CLIENTS_REQUEST_LIMIT as any)
    : (process.env.UNREGISTERED_CLIENTS_REQUEST_LIMIT as any);
  rateLimiter
    .consume(key, pointsToConsume)
    .then(() => {
      next();
    })
    .catch((_) => {
      res.status(429).end();
    });
};

export default rateLimiterMiddleware;
