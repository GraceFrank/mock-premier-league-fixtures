const mongoose = require('mongoose');
const { hashPassword } = require('../utils/hashPassword');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    lowercase: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    lowercase: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255
  },

  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }
});

//hash password before saving
UserSchema.pre('save', function() {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashPassword(this.password);
  next();
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
