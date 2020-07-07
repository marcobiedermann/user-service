import { Router } from 'express';
import createError from 'http-errors';

const router = Router();

function getError404() {
  throw createError(404);
}

router.route('*').get(getError404);

export default router;
