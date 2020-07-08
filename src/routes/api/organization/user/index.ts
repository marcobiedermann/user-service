import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetUsers } from '../../../../middlewares/validation/user';
import * as userService from '../../../../services/user';

async function getUsersByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const users = await userService.getUsersByOrganizationId(organizationId);

  response.json({
    users,
  });
}

const router = Router();

router.route('/').get(validateGetUsers, asyncHandler(getUsersByOrganization));

export default router;
