const {
  Strategy: TwitterStrategy,
} = require('passport-twitter');
const config = require('../config');
const User = require('../models/user');

const twitterStrategy = new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackUrl,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({
      'twitter.id': profile.id,
    }).exec();

    if (!user) {
      const newUser = new User({
        twitter: {
          id: profile.id,
          token: accessToken,
        },
      });

      await newUser.save();
      done(null, newUser);
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = twitterStrategy;
