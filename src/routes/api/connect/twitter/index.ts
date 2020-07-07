import { Router } from 'express';
import passport from '../../../../passport';

const router = Router();

router.route('/').get(
  passport.authorize('twitter', {
    scope: ['email', 'public_profile'],
  }),
);

router.route('/callback').get(
  passport.authorize('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export default router;
