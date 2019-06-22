const express = require('express');
const passport = require('../../../../passport');

const router = express.Router();
const baseRoute = '/callback';

router.route(baseRoute).get(
  passport.authorize('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

module.exports = router;
