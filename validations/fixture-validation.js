const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateFixture(fixture) {
  const schema = {
    date: Joi.date().required(),
    homeTeam: Joi.object({
      team: Joi.objectId().required(),
      score: Joi.number()
        .required()
        .min(0)
    }).required(),
    awayTeam: Joi.object({
      team: Joi.objectId().required(),
      score: Joi.number()
        .required()
        .min(0)
    }).required(),
    firstHalfStart: Joi.date().required(),
    secondHalfStart: Joi.date(),
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    venue: Joi.string()
      .min(2)
      .max(255)
      .required()
      .trim()
  };

  return Joi.validate(fixture, schema);
}

module.exports = validateFixture;
