const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const config = require('../config');
const User = require('../models/user');

const googleStrategy = new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({
      'google.id': profile.id,
    }).exec();

    if (!user) {
      const newUser = new User({
        google: {
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

module.exports = googleStrategy;
