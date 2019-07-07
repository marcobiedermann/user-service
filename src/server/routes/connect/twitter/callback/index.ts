import * as express from 'express';
import { passport } from '../../../../passport';

const router = express.Router();
const baseRoute = '/callback';

router.route(baseRoute).get(
  passport.authorize('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export { router };
