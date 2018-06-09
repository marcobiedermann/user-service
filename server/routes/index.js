const express = require('express');
const loginRoute = require('./login');

const router = express.Router();
const baseRoute = '/';

router.route(baseRoute)
  .get((request, response) => {
    response.send('Hello, world');
  });

router.use(baseRoute, loginRoute);

module.exports = router;
