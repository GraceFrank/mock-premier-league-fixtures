const bodyParser = require('body-parser');
const users = require('./users');

const routes = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/v1/users', users);
  // app.use('/api/v1/auth');
  // app.use('/api/v1/teams');
  // app.use('api/v1/fixtures');
};

module.exports = routes;
