import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { validateCreateOrganization } from '../middlewares/validation/organization';
import * as organizationService from '../services/organization';
import * as teamService from '../services/team';
import * as userService from '../services/user';

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

async function getTeamsByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const teams = await teamService.getTeamsByOrganizationId(organizationId);

  response.json({
    teams,
  });
}

async function getUsersByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const users = await userService.getUsersByOrganizationId(organizationId);

  response.json({
    users,
  });
}

router
  .route('/organizations')
  .get(asyncHandler(getOrganizations))
  .post(validateCreateOrganization, asyncHandler(createOrganization));

router
  .route('/organizations/:organizationId')
  .delete(asyncHandler(deleteOrganization))
  .get(asyncHandler(getOrganization))
  .patch(asyncHandler(updateOrganization));

router.route('/organizations/:organizationId/teams').get(asyncHandler(getTeamsByOrganization));

router.route('/organizations/:organizationId/users').get(asyncHandler(getUsersByOrganization));

export default router;
