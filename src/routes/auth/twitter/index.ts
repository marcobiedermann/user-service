import { Router } from 'express';
import passport from '../../../passport';

const router = Router();

router.route('/twitter').get(passport.authenticate('twitter'));

router.route('/twitter/callback').get(
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
