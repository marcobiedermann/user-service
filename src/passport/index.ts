/* eslint-disable @typescript-eslint/no-namespace */

import passport from 'passport';
import { getUserById } from '../services/user';
import githubStrategy from './github';
import googleStrategy from './google';
import jwtStrategy from './jwt';
import twitterStrategy from './twitter';

declare module 'passport' {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

passport.serializeUser<string>((user, done): void => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: string, done): Promise<void> => {
    try {
      const user = await getUserById(id);

      if (!user) {
        throw new Error('User could not be found');
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

passport.use(jwtStrategy);
passport.use(githubStrategy);
passport.use(googleStrategy);
passport.use(twitterStrategy);

export default passport;
