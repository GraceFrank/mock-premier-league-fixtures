const _ = require('lodash');

const validateLoginDetails = require('../validations/login-validation');
const response = require('../utils/responses');
const User = require('../models/user');
const { isValidPassword } = require('../utils/hashPassword');
const { createSession } = require('../utils/auth');

class AuthController {
  static async login(req, res) {
    try {
      //validate the req payload
      const { error } = validateLoginDetails(req.body);
      if (error)
        return response.badRequest(res, { message: error.details[0].message });

      //check if user with given email exist in db
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        if (!isValidPassword(req.body.password))
          //if user exist, validate password
          return response.unAuthorized(res, {
            message: 'invalid email or password'
          });

      //create session for the user
      user = _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'isAdmin']);
      const session = await createSession(user);
      if (!session) return response.internalError(res, err);

      return response.success(res, { session });
    } catch (err) {
      console.log(err);
      return response.internalError(res, err);
    }
  }
}

module.exports = AuthController;
