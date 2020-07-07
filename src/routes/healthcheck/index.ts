import { Router } from 'express';
import expressHealthcheck from 'express-healthcheck';

const router = Router();

router.use('/', expressHealthcheck());

export default router;
