import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup());

export default router;
