const express = require('express');
const githubRoute = require('./github');
const twitterRoute = require('./twitter');

const router = express.Router();
const baseRoute = '/auth';

router.use(baseRoute, githubRoute);
router.use(baseRoute, twitterRoute);

module.exports = router;
