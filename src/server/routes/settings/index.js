const express = require('express');

const router = express.Router();
const baseRoute = '/settings';

router.route(baseRoute).get((request, response) => {
  response.render('settings');
});

module.exports = router;
