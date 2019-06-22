const express = require('express');
const authRoute = require('./auth');
const connectRoute = require('./connect');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
const settingsRoute = require('./settings');

const router = express.Router();
const baseRoute = '/';

router.route(baseRoute).get((request, response) => {
  response.render('index');
});

router.use(baseRoute, authRoute);
router.use(baseRoute, connectRoute);
router.use(baseRoute, loginRoute);
router.use(baseRoute, logoutRoute);
router.use(baseRoute, settingsRoute);

module.exports = router;
