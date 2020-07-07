import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../config';
import { getUserById } from '../services/user';

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  },
  async (payload, done) => {
    const { sub } = payload;

    try {
      const user = await getUserById(sub);

      if (!user) {
        done(null);
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

export default jwtStrategy;
