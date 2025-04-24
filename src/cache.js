const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

(async () => {
  await client.connect();
})();

const getCache = async (key) => {
  return await client.get(key);
};

const setCache = async (key, value, ttl = null) => {
  if (value === null) {
    await client.del(key);
  } else if (ttl) {
    await client.setEx(key, ttl, value);
  } else {
    await client.set(key, value);
  }
};

module.exports = { getCache, setCache };