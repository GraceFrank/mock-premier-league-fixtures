const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateFixture(fixture) {
  const schema = {
    date: Joi.date().required(),
    homeTeam: Joi.objectId().required(),
    awayTeam: Joi.objectId().required(),
    score: Joi.array().items(Joi.number().min(0)),
    firstHalfStart: Joi.date().required(),
    secondHalfStart: Joi.date(),
    status: Joi.string().valid('pending', 'completed'),
    venue: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim()
  };

  return Joi.validate(fixture, schema);
}

module.exports = validateFixture;
