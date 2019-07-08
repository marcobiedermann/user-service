import { Router } from 'express';
import { passport } from '../../../passport';
import { router as callbackRoute } from './callback';

const router = Router();
const baseRoute = '/github';

router.route(baseRoute).get(passport.authenticate('github'));

router.use(baseRoute, callbackRoute);

export { router };
