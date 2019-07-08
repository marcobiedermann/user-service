import { Router } from 'express';
import { router as githubRoute } from './github';
import { router as googleRoute } from './google';
import { router as twitterRoute } from './twitter';

const router = Router();
const baseRoute = '/connect';

router.use(baseRoute, githubRoute);
router.use(baseRoute, googleRoute);
router.use(baseRoute, twitterRoute);

export { router };
