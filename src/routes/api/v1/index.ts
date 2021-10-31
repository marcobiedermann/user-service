import { Router } from 'express';
import authRoutes from './auth';
import connectRoutes from './connect';
import meRoutes from './me';
import organizationRoutes from './organization';
import teamRoutes from './team';
import userRoutes from './user';
import tokenRoutes from './token';

const router = Router();

router.use('/auth', authRoutes);
router.use('/connect', connectRoutes);
router.use('/me', meRoutes);
router.use('/organizations', organizationRoutes);
router.use('/teams', teamRoutes);
router.use('/tokens', tokenRoutes);
router.use('/users', userRoutes);

export default router;
