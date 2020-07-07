import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
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

router.route('/').get(asyncHandler(getUsersByOrganization));

export default router;
