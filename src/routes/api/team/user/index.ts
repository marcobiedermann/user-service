import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetUsers } from '../../../../middlewares/validation/user';
import * as userService from '../../../../services/user';

async function getUsersByTeam(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { teamId } = params;

  const users = await userService.getUsersByOrganizationId(teamId);

  response.json({
    users,
  });
}

const router = Router();

router.route('/').get(validateGetUsers, asyncHandler(getUsersByTeam));

export default router;
