import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';

const router = Router();

async function getMeHandler(request: Request, response: Response) {
  const { user } = request;

  response.json({
    user,
  });
}

router.route('/').get(passport.authenticate('basic'), asyncHandler(getMeHandler));

export default router;
