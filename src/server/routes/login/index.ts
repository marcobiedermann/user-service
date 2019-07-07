import * as express from 'express';

const router = express.Router();
const baseRoute = '/login';

router.route(baseRoute).get((request, response) => {
  response.render('login');
});

export { router };
