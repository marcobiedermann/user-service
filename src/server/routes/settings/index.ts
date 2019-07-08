import { Request, Response, Router } from 'express';

const router = Router();
const baseRoute = '/settings';

router.route(baseRoute).get((_request: Request, response: Response): void => {
  response.render('settings');
});

export { router };
