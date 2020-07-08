import { Router } from 'express';
import createError from 'http-errors';

const router = Router();

function getError404Handler() {
  throw createError(404);
}

router.route('*').get(getError404Handler);

export default router;
