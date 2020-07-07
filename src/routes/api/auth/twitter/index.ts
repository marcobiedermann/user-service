import { Router } from 'express';
import passport from '../../../../passport';

const router = Router();

router.route('/').get(passport.authenticate('twitter'));

router.route('/callback').get(
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
