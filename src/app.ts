import { errors } from 'celebrate';
import compression from 'compression';
import cors from 'cors';
import { milliseconds } from 'date-fns';
import express from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';
import config from './config';
import errorHandler from './middlewares/error';
import passport from './passport';
import routes from './routes';
import { stream } from './utils/logger';

const app = express();

app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded());
app.use(compression());
app.use(cors());
app.use(
  express.static(join(__dirname, 'public'), {
    maxAge: milliseconds({ years: 1 }),
  }),
);
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: {
      maxAge: milliseconds({ weeks: 2 }),
    },
  }),
);
app.use(helmet());
app.use(
  morgan('combined', {
    stream,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(errors());
app.use(errorHandler());

export default app;
