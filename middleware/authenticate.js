const { redisClient } = require('../startup/redis');
const response = require('../utils/responses');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return response.unAuthorized(res, { message: 'unAuthorized' });
  }
  const token = await redisClient.get(authorization);
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  return next();
};

module.exports = requireAuth;
