const express = require('express');
const passport = require('../../../passport');
const callbackRoute = require('./callback');

const router = express.Router();
const baseRoute = '/github';

router.route(baseRoute).get(passport.authenticate('github'));

router.use(baseRoute, callbackRoute);

module.exports = router;
