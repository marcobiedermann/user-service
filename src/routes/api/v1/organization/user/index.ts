import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetUsers } from '../../../../../middlewares/validation/user';
import { getUsersByOrganizationId } from '../../../../../services/user';

async function getUsersByOrganizationHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { organizationId },
  } = request;

  const users = await getUsersByOrganizationId(organizationId);

  response.json({
    users,
  });
}

const router = Router({ mergeParams: true });

router.route('/').get(validateGetUsers, asyncHandler(getUsersByOrganizationHandler));

export default router;
