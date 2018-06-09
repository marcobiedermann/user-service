const express = require('express');

const router = express.Router();
const baseRoute = '/login';

router.route(baseRoute)
  .get((request, response) => {
    response.render('login');
  });

module.exports = router;
