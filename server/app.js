const express = require('express');
const expressSession = require('express-session');
const config = require('./config');
const passport = require('./passport');
const routes = require('./routes');

const app = express();

app.use(expressSession({
  secret: config.session.secret,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

module.exports = app;
