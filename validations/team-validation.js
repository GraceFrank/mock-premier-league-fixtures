const Joi = require('joi');
/**
 * Method to validate request payload for creating or updating a team in a user
 * @param {object} loginDetails object to be validated
 * @return {object} validated object or error object if validation fails
 */
function validateTeamDetails(teamDetails) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required()
      .trim(),
    code: Joi.string()
      .min(3)
      .max(3)
      .required()
      .trim(),
    logo: Joi.string()
      .uri()
      .required(),
    country: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim(),
    stadium: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim(),
    city: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim()
  };

  return Joi.validate(fixture, schema);
}

module.exports = validateTeamDetails;
