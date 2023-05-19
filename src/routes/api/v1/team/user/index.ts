import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetUsers } from '../../../../../middlewares/validation/user';
import { getUsersByTeamId } from '../../../../../services/user';

async function getUsersByTeamHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { teamId },
  } = request;

  const users = await getUsersByTeamId(teamId);

  response.json({
    users,
  });
}

const router = Router({ mergeParams: true });

router.route('/').get(validateGetUsers, asyncHandler(getUsersByTeamHandler));

export default router;
