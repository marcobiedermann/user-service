import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config';
import { User } from '../models/user';

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  async (accessToken, refreshToken, profile, done) => {
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
  },
);

export { googleStrategy };
