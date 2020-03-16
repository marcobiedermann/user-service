import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config';
import { createUser, getUser } from '../services/user';

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  async (accessToken, refreshToken, profile, done): Promise<void> => {
    console.log({ accessToken, refreshToken, profile });

    try {
      const user = await getUser({
        googleId: profile.id,
      });

      if (!user) {
        const createdUser = await createUser({
          googleId: profile.id,
        });

        done(undefined, createdUser);
      }

      done(undefined, user);
    } catch (error) {
      done(error);
    }
  },
);

export default googleStrategy;
