import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/google';

router.route(baseRoute).get(
  passport.authorize('google', {
    scope: ['profile'],
  }),
);

router.use(baseRoute, callbackRoute);

export { router };
