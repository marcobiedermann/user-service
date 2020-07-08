import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import {
  validateCreateOrganization,
  validateDeleteOrganization,
  validateGetOrganization,
  validateGetOrganizations,
  validateUpdateOrganization,
} from '../../../middlewares/validation/organization';
import * as organizationService from '../../../services/organization';
import teamRoutes from './team';
import userRoutes from './user';

const router = Router();

async function createOrganization(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdOrganization = await organizationService.createOrganization(body);

  response.json({
    organization: createdOrganization,
  });
}

async function deleteOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const deletedOrganization = await organizationService.deleteOrganizationById(organizationId);

  response.json({
    organization: deletedOrganization,
  });
}

async function getOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const organization = await organizationService.getOrganizationById(organizationId);

  if (!organization) {
    throw createError(400, `Organization ${organizationId} not found`);
  }

  response.json({
    organization,
  });
}

async function getOrganizations(_request: Request, response: Response): Promise<void> {
  const organizations = await organizationService.getOrganizations();

  response.json({
    organizations,
  });
}

async function updateOrganization(request: Request, response: Response): Promise<void> {
  const { body, params } = request;
  const { organizationId } = params;

  const updatedOrganization = await organizationService.updateOrganizationById(
    organizationId,
    body,
  );

  response.json({
    organization: updatedOrganization,
  });
}

router
  .route('/')
  .get(validateGetOrganizations, asyncHandler(getOrganizations))
  .post(validateCreateOrganization, asyncHandler(createOrganization));

router
  .route('/:organizationId')
  .delete(validateDeleteOrganization, asyncHandler(deleteOrganization))
  .get(validateGetOrganization, asyncHandler(getOrganization))
  .patch(validateUpdateOrganization, asyncHandler(updateOrganization));

router.use('/:organizationId/teams', validateGetOrganization, teamRoutes);
router.use('/:organizationId/users', validateGetOrganization, userRoutes);

export default router;
