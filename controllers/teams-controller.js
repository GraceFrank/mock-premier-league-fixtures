const validatePayload = require('../validations/team-validation');
const response = require('../utils/responses');
const Team = require('../models/team');
const _ = require('lodash');

class TeamController {
  static async addTeam(req, res) {
    try {
      //validate that the req.body payload
      const { error } = validatePayload(req.body);
      if (error)
        return response.badRequest(res, { message: error.details[0].message });

      //check that Team with same name provided does not exist
      const existingTeam = await Team.findOne({ name: req.body.name });
      if (existingTeam)
        return response.alreadyExists(res, {
          message: `Team with name ${req.body.name} already in use`
        });

      const team = await Team.create(req.body);
      if (!team) return response.internalError(res);
      return response.created(res, team);
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async removeTeam(req, res) {
    try {
      const teamId = req.params.id;
      const team = await Team.findByIdAndDelete(teamId);
      if (!team) return response.notFound(res, { message: 'team not found' });
      return response.success(res, team);
    } catch (err) {
      return response.internalError(res, err);
    }
  }

  static async viewAllTeams(req, res) {
    try {
      // convert query to number
      let page = Number(req.query.page);
      let limit = Number(req.query.limit);

      //assign default values if query params are invalid
      page = page ? page : 1;
      limit = limit ? limit : 20;

      const teams = await Team.find({})
        .skip((page - 1) * limit)
        .limit(limit);

      const message = 'Array of 0 or more teams has been fetched successfully';
      return response.success(res, { message, teams });
    } catch (error) {
      return response.internalError(res, error);
    }
  }

  static async viewTeam(req, res) {
    try {
      const teamId = req.params.id;
      const team = await Team.findById(teamId);
      if (!team) return response.notFound(res, { message: 'Team not found' });
      return response.success(res, team);
    } catch (err) {
      return response.internalError(res, error);
    }
  }

  static async editTeam(req, res) {
    try {
      //validate that the req.body payload
      const { error } = validatePayload(req.body);
      if (error)
        return response.badRequest(res, { message: error.details[0].message });

      const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      if (!team)
        return response.notFound(res, {
          message: 'team does not exist'
        });

      return response.success(res, team);
    } catch (err) {
      return response.internalError(res, err);
    }
  }
}

module.exports = TeamController;
