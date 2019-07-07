import * as express from 'express';
import { router as githubRoute } from './github';
import { router as googleRoute } from './google';
import { router as twitterRoute } from './twitter';

const router = express.Router();
const baseRoute = '/auth';

router.use(baseRoute, githubRoute);
router.use(baseRoute, googleRoute);
router.use(baseRoute, twitterRoute);

export { router };
