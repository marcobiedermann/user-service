import { Strategy } from 'passport-github2';
import config from '../config';
import { createUser, getUser } from '../services/user';

interface Profile {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: { value: string }[];
  emails: { value: string }[];
}

type VerifyCallback = (
  err?: Error | null,
  user?: Express.User,
  info?: Record<string, unknown>,
) => void;

const githubStrategy = new Strategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
    scope: ['user:email'],
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> => {
    console.log({ accessToken, refreshToken, profile: JSON.stringify(profile) });

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
    } catch (err) {
      const error = err as Error;
      return done(error);
    }
  },
);

export default githubStrategy;
