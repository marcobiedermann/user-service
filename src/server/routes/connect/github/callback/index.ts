import { Router } from 'express';
import { passport } from '../../../../passport';

const router = Router();
const baseRoute = '/callback';

router.route(baseRoute).get(
  passport.authorize('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export { router };
