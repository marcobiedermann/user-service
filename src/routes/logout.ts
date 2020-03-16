import { Request, Response, Router } from 'express';

const router = Router();
const baseRoute = '/logout';

router.route(baseRoute).get((request: Request, response: Response): void => {
  request.logout();
  response.redirect('/');
});

export default router;
