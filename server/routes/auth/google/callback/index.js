const express = require('express');
const passport = require('../../../../passport');

const router = express.Router();
const baseRoute = '/callback';

router.route(baseRoute)
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }));

module.exports = router;
