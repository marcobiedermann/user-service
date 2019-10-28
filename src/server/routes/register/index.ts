import { Request, Response, Router } from 'express';

const router = Router();
const baseRoute = '/register';

router.route(baseRoute).get((_request: Request, response: Response): void => {
  response.render('register');
});

export { router };
