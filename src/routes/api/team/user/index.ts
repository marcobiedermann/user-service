import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetUsers } from '../../../../middlewares/validation/user';
import { getUsersByOrganizationId } from '../../../../services/user';

async function getUsersByTeamHandler(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { teamId } = params;

  const users = await getUsersByOrganizationId(teamId);

  response.json({
    users,
  });
}

const router = Router();

router.route('/').get(validateGetUsers, asyncHandler(getUsersByTeamHandler));

export default router;
