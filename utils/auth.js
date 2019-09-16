const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { redisClient } = require('../startup/redis');

const secretKey = config.jwtSecretKey;

const signToken = payload => jwt.sign(payload, secretKey);

const decodeToken = token => jwt.decode(token);

const setToken = (token, value) =>
  Promise.resolve(redisClient.set(token, value));

const getToken = token => Promise.resolve(redisClient.get(token));

const createSession = user => {
  const { isAdmin, _id } = user;
  const token = signToken(isAdmin);
  return setToken(token, _id)
    .then(() => {
      return { token, user };
    })
    .catch(error => {
      logger.error(error);
    });
};

async function f() {
  console.log(await createSession({ isAdmin: true, _id: 1 }));
}

f();
module.exports = { createSession, getToken, decodeToken };
