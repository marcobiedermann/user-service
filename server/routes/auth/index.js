const express = require('express');
const twitterRoute = require('./twitter');

const router = express.Router();
const baseRoute = '/auth';

router.use(baseRoute, twitterRoute);

module.exports = router;
