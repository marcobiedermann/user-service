import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/twitter';

router.route(baseRoute).get(passport.authenticate('twitter'));

router.use(baseRoute, callbackRoute);

export { router };
