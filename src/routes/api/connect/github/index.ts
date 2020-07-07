import { Router } from 'express';
import passport from '../../../../passport';

const router = Router();

router.route('/').get(
  passport.authorize('github', {
    scope: ['email', 'public_profile'],
  }),
);

router.route('/callback').get(
  passport.authorize('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export default router;
