import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/github';

router.route(baseRoute).get(
  passport.authorize('github', {
    scope: ['email', 'public_profile'],
  }),
);

router.use(baseRoute, callbackRoute);

export { router };
