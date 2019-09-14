require('dotenv').config();

//all configurations for the app read from the .env file
module.exports = {
  apiPort: process.env.API_PORT,
  databaseUrl: process.env.DATABASE_URL
};
