import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from '../../files/api-docs/swagger.json';

const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup());

export { router };
