//Connection to Redis client
const util = require('util');
const redis = require('redis');
const logger = require('../utils/logger');
const config = require('../config/config');

const redisClient = redis.createClient(config.redisUrl);
redisClient.get = util.promisify(redisClient.get);

function connectToRedis() {
  redisClient.on('connect', () => logger.info('connected to redis server'));
  redisClient.on('error', err => logger.error('error errorr'));
}

module.exports = { redisClient, connectToRedis };
