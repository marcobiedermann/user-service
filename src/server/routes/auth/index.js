const express = require('express');
const githubRoute = require('./github');
const googleRoute = require('./google');
const twitterRoute = require('./twitter');

const router = express.Router();
const baseRoute = '/auth';

router.use(baseRoute, githubRoute);
router.use(baseRoute, googleRoute);
router.use(baseRoute, twitterRoute);

module.exports = router;
