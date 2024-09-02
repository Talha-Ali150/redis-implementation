// importing redis.
const { Redis } = require("ioredis");
//creating an instance of redis.
const client = new Redis();

// exporting redis.
module.exports = { client };
