const passport = require('passport');
const twitterStrategy = require('./twitter');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(twitterStrategy);

module.exports = passport;
