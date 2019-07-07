import * as express from 'express';

const router = express.Router();
const baseRoute = '/settings';

router.route(baseRoute).get((request, response): void => {
  response.render('settings');
});

export { router };
