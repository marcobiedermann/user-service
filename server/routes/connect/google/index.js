const express = require('express');
const callbackRoute = require('./callback');
const passport = require('../../../passport');

const router = express.Router();
const baseRoute = '/google';

router.route(baseRoute).get(
  passport.authorize('google', {
    scope: ['profile'],
  }),
);

router.use(baseRoute, callbackRoute);

module.exports = router;
