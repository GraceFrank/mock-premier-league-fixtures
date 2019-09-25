const validatePayload = require('../validations/fixture-validation');
const response = require('../utils/responses');
const Fixture = require('../models/fixture');
const Team = require('../models/team');
const getPagination = require('../utils/getPagination');
const _ = require('lodash');

class FixtureController {
  static async addFixture(req, res) {
    try {
      //validate that the req.body payload
      const { error, value } = validatePayload(req.body);
      if (error)
        return response.badRequest(res, { message: error.details[0].message });

      //check that fixtures with teams provided  exist
      const teams = await Team.find({
        $or: [{ _id: value.homeTeam }, { _id: value.awayTeam }]
      });

      if (teams.length !== 2)
        return response.notFound(res, {
          message: 'one or more teams do not exist'
        });

      const fixture = await Fixture.create(req.body);
      if (!fixture) return response.internalError(res, err);

      return response.created(res, fixture);
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async getFixture(req, res) {
    try {
      const fixture = await Fixture.findById(req.params.id).populate('team');
      if (!fixture)
        return response.notFound(res, { message: 'fixture not found' });
      return response.success(res, fixture);
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async getAllFixtures(req, res) {
    try {
      const { page, limit } = getPagination(req);
      const fixtures = await Fixture.find({})
        .skip((page - 1) * limit)
        .limit(limit);

      const message =
        'Array of 0 or more fixtures has been fetched successfully';
      if (!fixtures) return response.internalError(res, err);

      return response.success(res, { message, fixtures });
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async removeFixture(req, res) {
    try {
      const fixtureId = req.params.id;
      const fixture = await Fixture.findByIdAndDelete(fixtureId);
      if (!fixture)
        return response.notFound(res, { message: 'fixture not found' });
      return response.success(res, fixture);
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async editFixture(req, res) {
    try {
      //validate that the req.body payload
      const { error } = validatePayload(req.body);
      if (error)
        return response.badRequest(res, { message: error.details[0].message });

      //check that fixtures with teams provided  exist
      const teams = await Team.find({
        $or: [{ _id: value.homeTeam }, { _id: value.awayTeam }]
      });

      if (teams.length !== 2)
        return response.notFound(res, {
          message: 'one or more teams do not exist'
        });

      const fixture = await Fixture.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      if (!fixture)
        return response.notFound(res, {
          message: 'fixture does not exist'
        });

      return response.success(res, fixture);
    } catch (err) {
      return response.internalError(res, err);
    }
  }
}

module.exports = FixtureController;
