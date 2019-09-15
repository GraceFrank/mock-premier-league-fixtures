const Joi = require('joi');
/**
 * Method to validate request payload for creating user
 * @param {object} userObject object to be validated
 * @return {object} validated object or error object if validation fails
 */
function validateUser(userObject) {
  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim(),

    lastName: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim(),

    email: Joi.string()
      .email()
      .required()
      .trim(),

    password: Joi.string()
      .required()
      .min(8)
      .max(255)
  };

  return Joi.validate(userObject, schema);
}

module.exports = validateUser;
