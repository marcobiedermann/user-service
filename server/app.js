const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('./passport');
const routes = require('./routes');

const app = express();

mongoose.connect(config.mongodbUri);
mongoose.connection.on('error', () => process.exit());

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views/pages`);

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: config.session.secret,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

module.exports = app;
