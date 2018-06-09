const express = require('express');
const passport = require('../../../passport');
const callbackRoute = require('./callback');

const router = express.Router();
const baseRoute = '/twitter';

router.route(baseRoute)
  .get(passport.authenticate('twitter'));

router.use(baseRoute, callbackRoute);

module.exports = router;
