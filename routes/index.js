const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const users = require('./users-route');
const auth = require('./auth-route');
const teams = require('./teams-route');
const fixtures = require('./fixtures-route');

const routes = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/users', users);
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/teams', teams);
  app.use('/api/v1/fixtures', fixtures);

  app.use(helmet());
  app.use(compression());
};

module.exports = routes;
