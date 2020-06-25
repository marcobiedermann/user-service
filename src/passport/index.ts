import passport from 'passport';
import { getUserById } from '../services/user';
import githubStrategy from './github';
import googleStrategy from './google';
import twitterStrategy from './twitter';

passport.serializeUser<any, any>((user, done): void => {
  done(null, user.id);
});

passport.deserializeUser(
  async (id: string, done): Promise<void> => {
    try {
      const user = await getUserById(id);

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

passport.use(githubStrategy);
passport.use(googleStrategy);
passport.use(twitterStrategy);

export default passport;
