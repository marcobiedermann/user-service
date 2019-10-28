import { Request, Response, Router } from 'express';
import { router as authRoute } from './auth';
import { router as connectRoute } from './connect';
import { router as loginRoute } from './login';
import { router as logoutRoute } from './logout';
import { router as registerRoute } from './register';
import { router as settingsRoute } from './settings';

const router = Router();
const baseRoute = '/';

router.route(baseRoute).get((_request: Request, response: Response): void => {
  response.render('index');
});

router.use(baseRoute, authRoute);
router.use(baseRoute, connectRoute);
router.use(baseRoute, loginRoute);
router.use(baseRoute, logoutRoute);
router.use(baseRoute, registerRoute);
router.use(baseRoute, settingsRoute);

export { router };
