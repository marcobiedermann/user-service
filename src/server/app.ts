import * as express from 'express';
import * as expressSession from 'express-session';
import * as mongoose from 'mongoose';
import { config } from './config';
import { passport } from './passport';
import { router as routes } from './routes';

mongoose.connect(config.mongodbUri);
mongoose.connection.on('error', (): void => process.exit());

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();

    this.config();
  }

  public config(): void {
    this.app.set('view engine', 'ejs');
    this.app.set('views', `${__dirname}/views/pages`);

    this.app.use(
      expressSession({
        resave: true,
        saveUninitialized: true,
        secret: config.session.secret,
      }),
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(routes);
  }
}

const { app } = new App();

export { app };
