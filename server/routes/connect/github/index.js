const express = require('express');
const callbackRoute = require('./callback');
const passport = require('../../../passport');

const router = express.Router();
const baseRoute = '/github';

router.route(baseRoute).get(
  passport.authorize('github', {
    scope: ['email', 'public_profile'],
  }),
);

router.use(baseRoute, callbackRoute);

module.exports = router;
