import { Router } from 'express';
import passport from '../../../../passport';

const router = Router();

router.route('/').get(passport.authenticate('github'));

router.route('/callback').get(
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
