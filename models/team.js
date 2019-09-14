const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 250
  },
  code: {
    type: String,
    required: true,
    min: 3,
    max: 3
  },
  logo: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true,
    min: 3,
    max: 250
  },
  stadium: {
    type: String,
    required: true,
    min: 3,
    max: 250
  },
  city: {
    type: String,
    required: true,
    min: 3,
    max: 250
  }
});

const Team = mongoose.model('teams', TeamSchema);
module.exports = Team;
