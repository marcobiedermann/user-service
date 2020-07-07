import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as organizationService from '../../../../services/organization';

async function getOrganizationsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const organizations = await organizationService.getOrganizationsByUserId(userId);

  response.json({
    organizations,
  });
}

const router = Router();

router.route('/:userId/organizations').get(asyncHandler(getOrganizationsByUser));

export default router;
