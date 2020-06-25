import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
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

  const deletedOrganization = await organizationService.deleteOrganizationById(
    params.organizationId,
  );

  response.json({
    organization: deletedOrganization,
  });
}

async function getOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const organization = await organizationService.getOrganizationById(params.organizationId);

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

  const updatedOrganization = await organizationService.updateOrganizationById(
    params.organizationId,
    body,
  );

  response.json({
    organization: updatedOrganization,
  });
}

async function getTeamsByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const teams = await teamService.getTeamsByOrganizationId(params.organizationId);

  response.json({
    teams,
  });
}

async function getUsersByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const users = await userService.getUsersByOrganizationId(params.organizationId);

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
