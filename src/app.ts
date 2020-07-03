import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import express from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import handleError from './middlewares/error';
import passport from './passport';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
  }),
);
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(errors());
app.use(handleError);

export default app;
