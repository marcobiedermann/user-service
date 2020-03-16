import { Router } from 'express';
import passport from '../../../passport';

const router = Router();

router.route('/google').get(
  passport.authorize('google', {
    scope: ['profile'],
  }),
);

router.route('/google/callback').get(
  passport.authorize('google', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }),
);

export default router;
