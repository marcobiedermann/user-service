const express = require('express');

const router = express.Router();
const baseRoute = '/login';

router.route(baseRoute)
  .get((request, response) => {
    response.send('Login');
  });

module.exports = router;
