import { Request, Response, Router } from 'express';
import apiDocs from './api-docs';
import authRoutes from './auth';
import connectRoutes from './connect';
import error404 from './error-404';
import healthcheck from './healthcheck';
import logoutRoutes from './logout';
import meRoutes from './me';
import organizationRoutes from './organization';
import teamRoutes from './team';
import userRoutes from './user';

const router = Router();

router.route('/').get((_request: Request, response: Response) => response.redirect('/api-docs'));

router.use(apiDocs);
router.use(authRoutes);
router.use(connectRoutes);
router.use(healthcheck);
router.use(logoutRoutes);
router.use(meRoutes);
router.use(organizationRoutes);
router.use(teamRoutes);
router.use(userRoutes);
router.use(error404);

export default router;
