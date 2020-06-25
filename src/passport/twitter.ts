import { Strategy as TwitterStrategy } from 'passport-twitter';
import config from '../config';
import { createUser, getUser } from '../services/user';

const twitterStrategy = new TwitterStrategy(
  {
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackUrl,
    includeEmail: true,
  },
  async (accessToken, refreshToken, profile, done): Promise<void> => {
    console.log({ accessToken, refreshToken, profile });

    try {
      const user = await getUser({
        twitterId: profile.id,
      });

      if (!user) {
        const createdUser = await createUser({
          mail: profile.emails && profile.emails[0].value,
          name: profile.displayName,
          twitterId: profile.id,
        });

        return done(null, createdUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default twitterStrategy;
