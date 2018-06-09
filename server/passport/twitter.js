const { Strategy: TwitterStrategy } = require('passport-twitter');
const config = require('../config');

const twitterStrategy = new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackUrl,
}, (accessToken, refreshToken, profile, done) => {
  console.log('Access Token', accessToken);
  console.log('Refresh Token', refreshToken);
  console.log('Profile', profile);

  done(null, profile);
});

module.exports = twitterStrategy;
