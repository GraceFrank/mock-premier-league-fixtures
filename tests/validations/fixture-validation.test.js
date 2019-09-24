const mongoose = require('mongoose');
const validateFixture = require('../../validations/fixture-validation');

const fixture = {
  date: '1568893352276',
  homeTeam: '5d818bdcfc6aab03d3cc4496',
  awayTeam: '5d836a10549c930d9223cbab',
  firstHalfStart: '1568893352276',
  venue: 'tortiham'
};
describe('validation of fixture payload', () => {
  test('that when all details are provided, no error is thrown', () => {
    console.log(fixture.date);
    const { error } = validateFixture(fixture);
    expect(error).toBe(null);
  });

  test('that if date is not provided, error object is returned', () => {
    fixture.date = null;
    const { error } = validateFixture(fixture);
    expect(error).not.toBe(null);
  });

  test('that  invalid date is not accepted ', () => {
    fixture.date = 'hellorjlk';
    const { error } = validateFixture(fixture);
    expect(error).not.toBe(null);
  });

  test('invalid Id is not accepted,', () => {
    fixture.date = '1568893352276';
    fixture.awayTeam = '12345678987654';
    const { error } = validateFixture(fixture);
    expect(error).not.toBe(null);
  });
});
