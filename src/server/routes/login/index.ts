import { Request, Response, Router } from 'express';

const router = Router();
const baseRoute = '/login';

router.route(baseRoute).get((_request: Request, response: Response): void => {
  response.render('login');
});

export { router };
