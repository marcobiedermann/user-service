const express = require('express');
const callbackRoute = require('./callback');
const passport = require('../../../passport');

const router = express.Router();
const baseRoute = '/twitter';

router.route(baseRoute).get(
  passport.authorize('twitter', {
    scope: ['email', 'public_profile'],
  }),
);

router.use(baseRoute, callbackRoute);

module.exports = router;
