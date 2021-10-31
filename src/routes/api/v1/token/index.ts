import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateCreateToken } from '../../../../middlewares/validation/token';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../../../utils/auth';

const router = Router();

async function createToken(request: Request, response: Response): Promise<void> {
  const { refreshToken } = request.body;

  const payload = await verifyRefreshToken(refreshToken);

  const user = {
    id: payload.id,
  };

  const [newAccessToken, newRefreshToken] = await Promise.all([
    signAccessToken(user),
    signRefreshToken(user),
  ]);

  response.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}

router.route('/').post(validateCreateToken, asyncHandler(createToken));

export default router;
