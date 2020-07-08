import { Request, Response, Router } from 'express';
import apiRoutes from './api';
import apiDocs from './api-docs';
import error404 from './error-404';
import healthcheck from './healthcheck';
import logoutRoutes from './logout';

const router = Router();

function getIndexHandler(_request: Request, response: Response) {
  response.redirect('/api-docs');
}

router.route('/').get(getIndexHandler);

router.use('/api-docs', apiDocs);
router.use('/healthcheck', healthcheck);
router.use('/logout', logoutRoutes);
router.use('/api', apiRoutes);
router.use('*', error404);

export default router;
