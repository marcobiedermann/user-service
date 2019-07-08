import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/twitter';

router.route(baseRoute).get(
  passport.authorize('twitter', {
    scope: ['email', 'public_profile'],
  }),
);

router.use(baseRoute, callbackRoute);

export { router };
