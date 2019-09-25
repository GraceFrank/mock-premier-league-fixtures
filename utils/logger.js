const winston = require('winston');

const { combine, timestamp, prettyPrint, colorize } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint(), colorize()),
  //transports are the means by which the errors or info are logged
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ],
});

module.exports = logger;