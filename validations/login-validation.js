const Joi = require('joi');
/**
 * Method to validate request payload for logging in a user
 * @param {object} loginDetails object to be validated
 * @return {object} validated object or error object if validation fails
 */
function validateLoginDetails(loginDetails) {
  const schema = {
    email: Joi.string()
      .email()
      .required()
      .trim(),

    password: Joi.string()
      .required()
      .max(255)
  };

  return Joi.validate(loginDetails, schema);
}

module.exports = validateLoginDetails;
