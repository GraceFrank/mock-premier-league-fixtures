const bcrypt = require('bcrypt');

//method to hash passwords
const hashPassword = password => bcrypt.hashSync(password, 10);

const isValidPassword = (userPassword, hashedPassword) =>
  bcrypt.compare(userPassword, hashedPassword);

module.exports = { hashPassword, isValidPassword };
