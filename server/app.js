const express = require('express');
const passport = require('./passport');
const routes = require('./routes');

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

module.exports = app;
