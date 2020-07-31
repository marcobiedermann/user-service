import { Router } from 'express';
import passport from '../../../../../passport';

const router = Router({ mergeParams: true });

router.route('/').get(
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

router.route('/callback').get(
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
