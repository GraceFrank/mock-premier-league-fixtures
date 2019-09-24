const mongoose = require('mongoose');
const validateUser = require('../../validations/user-validation');
const user = {
  firstName: 'randomName',
  lastName: 'randomLastName',
  email: 'random@email.com',
  password: 'password'
};

describe('test the  user payload validator', () => {
  test('that valid firstName is always passed', () => {
    const fakeUser = Object.create(user);
    fakeUser.firstName = undefined;
    const { error } = validateUser(fakeUser);
    expect(error).not.toBe(null);
    expect(error).toBeDefined();
  });

  test('that valid lastName is always passed', () => {
    const fakeUser = Object.create(user);
    fakeUser.lastName = '';
    const { error } = validateUser(fakeUser);
    expect(error).not.toBe(null);
    expect(error).toBeDefined();
  });

  test('that valid password cannot be empty ', () => {
    const fakeUser = Object.create(user);
    fakeUser.password = '';
    const { error } = validateUser(fakeUser);
    expect(error).not.toBe(null);
    expect(error).toBeDefined();
  });

  test('that valid email is passed', () => {
    const fakeUser = Object.create(user);
    fakeUser.email = 'frank@';
    const { error } = validateUser(fakeUser);
    expect(error).not.toBe(null);
    expect(error).toBeDefined();
  });

  test('that valid payload is accepted', () => {
    const { error, value } = validateUser(user);
    expect(error).toBe(null);
    expect(value).toEqual(user);
  });
});
