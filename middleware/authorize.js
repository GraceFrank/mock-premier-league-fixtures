const { decodeToken } = require('../utils/auth');
const response = require('../utils/responses');

const authorizeUser = (req, res, next) => {
  const { authorization } = req.headers;
  const isAdmin = decodeToken(authorization);
  if (isAdmin) return next();

  return response.forbidden(res, { message: `forbidden` });
};

module.exports = authorizeUser;
