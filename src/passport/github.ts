import { Strategy } from 'passport-github';
import config from '../config';
import { createUser, getUser } from '../services/user';

const githubStrategy = new Strategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
    scope: 'user:email',
  },
  async (_accessToken, _refreshToken, profile, done): Promise<void> => {
    try {
      const user = await getUser({
        githubId: profile.id,
      });

      if (!user) {
        const createdUser = await createUser({
          mail: profile.emails && profile.emails[0].value,
          name: profile.displayName,
          githubId: profile.id,
        });

        return done(null, createdUser);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default githubStrategy;
