require('dotenv').config();
const logger = require('./logger');

const response = {
  success: (res, data, code = 200) =>
    res.status(code).json({
      success: true,
      data
    }),

  created: (res, data, code = 201) =>
    res.status(code).json({
      success: true,
      data
    }),

  notFound: (res, errors, code = 404) =>
    res.status(code).json({
      success: false,
      errors: [{ ...errors }]
    }),

  forbidden: (res, errors, code = 403) =>
    res.status(code).json({
      success: false,
      errors: [{ ...errors }]
    }),

  badRequest: (res, errors, code = 400) =>
    res.status(code).json({
      success: false,
      errors: errors.errors ? errors.errors : [{ ...errors }]
    }),

  unAuthorized: (res, errors, code = 401) =>
    res.status(code).json({
      success: false,
      errors: [{ ...errors }]
    }),

  alreadyExists: (res, errors, code = 409) =>
    res.status(code).json({
      success: false,
      errors: [{ ...errors }]
    }),

  internalError: (res, errors, code = 500) => {
    logger.error(`${errors}`);
    const err =
      process.env.NODE_ENV === 'production'
        ? 'An error occured while processing your request, try again'
        : errors;
    res.status(code).json({
      success: false,
      errors: err.message
    });
  }
};

module.exports = response;
