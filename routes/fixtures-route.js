const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateId = require('../middleware/validate-id');
const FixtureController = require('../controllers/fixture-controller');

const router = express.Router();

router.post('/', [authenticate, authorize], FixtureController.addFixture);
router.get('/', authenticate, FixtureController.getAllFixtures);
router.get('/:id', authenticate, FixtureController.getFixture);
router.delete(
  '/:id',
  [authenticate, authorize],
  FixtureController.removeFixture
);
router.put('/:id', [authenticate, authorize], FixtureController.editFixture);

module.exports = router;
