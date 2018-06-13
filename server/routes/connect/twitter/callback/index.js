const express = require('express');
const passport = require('../../../../passport');

const router = express.Router();
const baseRoute = '/callback';

router.route(baseRoute)
  .get(passport.authorize('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));

module.exports = router;
