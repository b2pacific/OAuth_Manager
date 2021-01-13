import redis from "redis";
const client = redis.createClient((process.env.REDIS_PORT as any) || 6379);

export default client;
