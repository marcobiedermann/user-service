import { Router } from 'express';
import githubRoutes from './github';
import googleRoutes from './google';
import twitterRoutes from './twitter';

const router = Router();
const baseRoute = '/auth';

router.use(baseRoute, githubRoutes);
router.use(baseRoute, googleRoutes);
router.use(baseRoute, twitterRoutes);

export default router;
