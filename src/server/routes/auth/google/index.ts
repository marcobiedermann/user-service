import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/google';

router.route(baseRoute).get(passport.authenticate('google'));

router.use(baseRoute, callbackRoute);

export { router };
