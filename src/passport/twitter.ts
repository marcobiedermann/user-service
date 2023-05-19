import { Strategy } from 'passport-twitter';
import config from '../config';
import { createUser, getUser } from '../services/user';

const twitterStrategy = new Strategy(
  {
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackUrl,
    includeEmail: true,
  },
  async (accessToken, refreshToken, profile, done): Promise<void> => {
    console.log({ accessToken, refreshToken, profile: JSON.stringify(profile) });

    try {
      const user = await getUser({
        twitterId: profile.id,
      });

      console.log({ user });

      if (!user) {
        const createdUser = await createUser({
          mail: (profile.emails && profile.emails[0].value) || '',
          name: profile.displayName,
          twitterId: profile.id,
        });

        console.log({ createdUser });

        return done(null, createdUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default twitterStrategy;
