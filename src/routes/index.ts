import { Request, Response, Router } from 'express';
import apiDocs from './api-docs';
import authRoutes from './auth';
import connectRoutes from './connect';
import logoutRoutes from './logout';
import organizationRoutes from './organization';
import teamRoutes from './team';
import userRoutes from './user';

const router = Router();

router.route('/').get((_request: Request, response: Response) => response.redirect('/api-docs'));

router.use(authRoutes);
router.use(connectRoutes);
router.use(logoutRoutes);
router.use(organizationRoutes);
router.use(teamRoutes);
router.use(userRoutes);
router.use(apiDocs);

export default router;
