import { Router } from 'express';
import passport from '../../../passport';

const router = Router();

router.route('/github').get(passport.authenticate('github'));

router.route('/github/callback').get(
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
