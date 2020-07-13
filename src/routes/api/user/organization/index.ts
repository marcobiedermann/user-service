import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetOrganizations } from '../../../../middlewares/validation/organization';
import { getOrganizationsByUserId } from '../../../../services/organization';

async function getOrganizationsByUserHandler(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const organizations = await getOrganizationsByUserId(userId);

  response.json({
    organizations,
  });
}

const router = Router({ mergeParams: true });

router.route('/').get(validateGetOrganizations, asyncHandler(getOrganizationsByUserHandler));

export default router;
