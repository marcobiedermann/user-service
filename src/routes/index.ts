import { Router } from 'express';
import authRoutes from './auth';
import connectRoutes from './connect';
import logoutRoutes from './logout';
import organizationRoutes from './organization';
import teamRoutes from './team';
import userRoutes from './user';

const router = Router();

router.use(authRoutes);
router.use(connectRoutes);
router.use(logoutRoutes);
router.use(organizationRoutes);
router.use(teamRoutes);
router.use(userRoutes);

export default router;
