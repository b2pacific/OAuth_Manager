import redis from "redis";
const client = redis.createClient((process.env.REDIS_PORT as any) || 6379);

client.on("error", (err) => {
  console.log("Error: ", err);
});

export default client;

// {
// port      : 6379,               // replace with your port
// host      : '120.0.0.1',        // replace with your hostanme or IP address
// password  : 'your password',    // replace with your password
// }