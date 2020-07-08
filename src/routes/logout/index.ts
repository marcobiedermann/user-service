import { Request, Response, Router } from 'express';

const router = Router();

function getLogoutHandler(request: Request, response: Response) {
  request.logout();
  response.redirect('/');
}

router.route('/').get(getLogoutHandler);

export default router;
