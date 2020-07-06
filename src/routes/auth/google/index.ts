import { Router } from 'express';
import passport from '../../../passport';

const router = Router();

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

router.route('/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
