const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  team: {
    type: mongoose.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  score: {
    type: Number,
    default: 0,
    min: 0
  }
});
const FixtureSchema = new mongoose.Schema({
  date: Date,
  homeTeam: { type: TeamSchema, required: true },
  awayTeam: { type: TeamSchema, required: true },
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
  link: String
});

const Fixture = mongoose.model('fixtures', FixtureSchema);

module.exports = Fixture;
