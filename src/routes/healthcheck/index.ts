import { Router } from 'express';
import expressHealthcheck from 'express-healthcheck';

const router = Router();

router.use('/healthcheck', expressHealthcheck());

export default router;
