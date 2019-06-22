const express = require('express');
const passport = require('../../../passport');
const callbackRoute = require('./callback');

const router = express.Router();
const baseRoute = '/google';

router.route(baseRoute).get(passport.authenticate('google'));

router.use(baseRoute, callbackRoute);

module.exports = router;
