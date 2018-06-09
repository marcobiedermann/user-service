const express = require('express');
const authRoute = require('./auth');
const loginRoute = require('./login');

const router = express.Router();
const baseRoute = '/';

router.route(baseRoute)
  .get((request, response) => {
    response.render('index');
  });

router.use(baseRoute, authRoute);
router.use(baseRoute, loginRoute);

module.exports = router;
