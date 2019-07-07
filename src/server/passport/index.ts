import * as passport from 'passport';
import { User } from '../models/user';
import { githubStrategy } from './github';
import { googleStrategy } from './google';
import { twitterStrategy } from './twitter';

passport.serializeUser<any, any>((user, done): void => {
  done(null, user.id);
});

passport.deserializeUser((id, done): void => {
  User.findById(id, (error, user): void => {
    done(error, user);
  });
});

passport.use(githubStrategy);
passport.use(googleStrategy);
passport.use(twitterStrategy);

export { passport };
