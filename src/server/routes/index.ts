import * as express from 'express';
import { router as authRoute } from './auth';
import { router as connectRoute } from './connect';
import { router as loginRoute } from './login';
import { router as logoutRoute } from './logout';
import { router as settingsRoute } from './settings';

const router = express.Router();
const baseRoute = '/';

router.route(baseRoute).get((request, response) => {
  response.render('index');
});

router.use(baseRoute, authRoute);
router.use(baseRoute, connectRoute);
router.use(baseRoute, loginRoute);
router.use(baseRoute, logoutRoute);
router.use(baseRoute, settingsRoute);

export { router };
