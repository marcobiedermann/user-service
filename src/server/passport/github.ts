import { Strategy as GithubStrategy } from 'passport-github';
import { config } from '../config';
import { User } from '../models/user';

const githubStrategy = new GithubStrategy(
  {
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackUrl,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({
        'github.id': profile.id,
      }).exec();

      if (!user) {
        const newUser = new User({
          github: {
            id: profile.id,
            token: accessToken,
          },
        });

        await newUser.save();
        done(null, newUser);
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);

export { githubStrategy };
