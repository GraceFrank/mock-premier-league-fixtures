const faker = require('faker');
const { connectToRedis } = require('../startup/redis');
const connectDatabase = require('../startup/mongodb');
const User = require('../models/user');
const Team = require('../models/team');
const Fixture = require('../models/fixture');

connectToRedis();
connectDatabase().then(() => {});

const fakeUser = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: 'password'
});

const fakeTeam = () => ({
  name: faker.company.companyName(),
  code: faker.address.countryCode(),
  logo: faker.image.avatar(),
  country: faker.address.country(),
  stadium: faker.address.city(),
  city: faker.address.city()
});

const fakeFixture = ({ homeTeam, awayTeam, status, scores }) => ({
  date: new Date(),
  homeTeam: homeTeam._id,
  awayTeam: awayTeam._id,
  firstHalfStart: new Date(),
  secondHalfStart: new Date() + 45 * 60000,
  status: status,
  venue: homeTeam.stadium,
  scores: scores
});

function seedUser(amount = 20) {
  const users = [];
  for (let i = 1; i <= amount; i++) {
    const user = new User(fakeUser());
    users.push(user);
  }
  User.insertMany(users);
}

function seedTeam(amount = 10) {
  const teams = [];
  for (let i = 1; i <= amount; i++) {
    const team = new Team(fakeTeam());
    teams.push(team);
  }
  Team.insertMany(teams);
}

async function seedFixture(amount = 10) {
  //fetch all teams in data base,
  const teams = await Team.find({});

  const randomNumber = range => Math.floor(Math.random() * (range + 1));

  const fixtures = [];

  for (let i = 1; i < amount; i++) {
    let homeTeam = randomNumber(teams.length - 1);
    let awayTeam = randomNumber(teams.length - 1);

    while (homeTeam === awayTeam) awayTeam = randomNumber(teams.length - 1);

    let scores = [randomNumber(5), randomNumber(5)];

    let status = () => (randomNumber(1) ? 'completed' : 'pending');

    const fixture = new Fixture(
      fakeFixture({
        homeTeam: teams[homeTeam],
        awayTeam: teams[awayTeam],
        status: status(),
        scores
      })
    );

    fixtures.push(fixture);
  }

  Fixture.insertMany(fixtures);
}

seedFixture(30);
