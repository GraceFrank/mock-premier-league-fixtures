const mongoose = require('mongoose');

const FixtureSchema = new mongoose.Schema({
  date: Date,
  homeTeam: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  awayTeam: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  firstHalfStart: Date,
  secondHalfStart: Date,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  venue: {
    type: String,
    min: 2,
    max: 50
  },
  link: String,
  scores: {
    type: [Number],
    default: [0, 0],
    min: 0
  }
});

const Fixture = mongoose.model('fixtures', FixtureSchema);

module.exports = Fixture;
