import { Router } from 'express';
import githubRoutes from './github';
import googleRoutes from './google';
import twitterRoutes from './twitter';

const router = Router();

router.use('/github', githubRoutes);
router.use('/google', googleRoutes);
router.use('/twitter', twitterRoutes);

export default router;
