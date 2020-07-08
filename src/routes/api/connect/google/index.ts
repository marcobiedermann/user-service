import { Router } from 'express';
import passport from '../../../../passport';

const router = Router({ mergeParams: true });

router.route('/').get(
  passport.authorize('google', {
    scope: ['profile'],
  }),
);

router.route('/callback').get(
  passport.authorize('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export default router;
