import * as express from 'express';
import * as expressSession from 'express-session';
import * as mongoose from 'mongoose';
import { config } from './config';
import { passport } from './passport';
import { router as routes } from './routes';

const app = express();

mongoose.connect(config.mongodbUri);
mongoose.connection.on('error', () => process.exit());

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views/pages`);

app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: config.session.secret,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

export { app };
