require('dotenv').config();

//all configurations for the app read from the .env file
module.exports = {
  apiPort: process.env.API_PORT,
  databaseUrl: process.env.DATABASE_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisUrl: process.env.REDIS_URL,
  redisPassword: process.env.REDIS_PASSWORD,
  jwtSecretKey: process.env.JWT_SECRET_KEY
};
