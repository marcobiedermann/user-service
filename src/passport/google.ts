import { Strategy } from 'passport-google-oauth20';
import config from '../config';
import { createUser, getUser } from '../services/user';

const googleStrategy = new Strategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
  },
  async (accessToken, refreshToken, profile, done): Promise<void> => {
    console.log({ accessToken, refreshToken, profile: JSON.stringify(profile) });

    try {
      const user = await getUser({
        googleId: profile.id,
      });

      if (!user) {
        const createdUser = await createUser({
          mail: (profile.emails && profile.emails[0].value) || '',
          name: profile.displayName,
          googleId: profile.id,
        });

        return done(undefined, createdUser);
      }

      return done(undefined, user);
    } catch (err) {
      const error = err as Error;

      return done(error);
    }
  },
);

export default googleStrategy;
