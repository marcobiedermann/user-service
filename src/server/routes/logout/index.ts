import * as express from 'express';

const router = express.Router();
const baseRoute = '/logout';

router.route(baseRoute).get((request, response): void => {
  request.logout();
  response.redirect('/');
});

export { router };
