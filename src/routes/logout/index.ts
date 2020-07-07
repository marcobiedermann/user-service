import { Request, Response, Router } from 'express';

const router = Router();

router.route('/').get((request: Request, response: Response): void => {
  request.logout();
  response.redirect('/');
});

export default router;
