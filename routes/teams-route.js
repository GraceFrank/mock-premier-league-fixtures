const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateId = require('../middleware/validate-id');

const router = express.Router();

const TeamsController = require('../controllers/teams-controller');

//endpoint to add a team
router.post('/', [authenticate, authorize], TeamsController.addTeam);

//endpoint to remove a team
router.delete(
  '/:id',
  [validateId, authenticate, authorize],
  TeamsController.removeTeam
);

router.put('/:id', [validateId, authenticate, authorize],
TeamsController.editTeam)

//endpoint to view all teams
router.get('/', [authenticate], TeamsController.viewAllTeams);

//endpoint to view a team
router.get('/:id', [validateId, authenticate], TeamsController.viewTeam);

module.exports = router;
