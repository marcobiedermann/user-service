import { Router } from 'express';
import passport from '../../../passport';

const router = Router();

router.route('/github').get(
  passport.authorize('github', {
    scope: ['email', 'public_profile'],
  }),
);

router.route('/github/callback').get(
  passport.authorize('github', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export default router;
