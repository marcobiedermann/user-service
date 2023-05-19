import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import {
  validateCreateOrganization,
  validateDeleteOrganization,
  validateGetOrganization,
  validateGetOrganizations,
  validateUpdateOrganization,
} from '../../../../middlewares/validation/organization';
import {
  createOrganization,
  deleteOrganizationById,
  getOrganizationById,
  getOrganizations,
  updateOrganizationById,
} from '../../../../services/organization';
import teamRoutes from './team';
import userRoutes from './user';

async function createOrganizationHandler(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdOrganization = await createOrganization(body);

  response.status(StatusCodes.CREATED).json({
    organization: createdOrganization,
  });
}

async function deleteOrganizationHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { organizationId },
  } = request;

  await deleteOrganizationById(organizationId);

  response.sendStatus(StatusCodes.NO_CONTENT);
}

async function getOrganizationHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { organizationId },
  } = request;

  const organization = await getOrganizationById(organizationId);

  if (!organization) {
    throw createError(StatusCodes.NOT_FOUND, `Organization ${organizationId} not found`);
  }

  response.json({
    organization,
  });
}

async function getOrganizationsHandler(_request: Request, response: Response): Promise<void> {
  const organizations = await getOrganizations();

  response.json({
    organizations,
  });
}

async function updateOrganizationHandler(request: Request, response: Response): Promise<void> {
  const {
    body,
    params: { organizationId },
  } = request;

  const updatedOrganization = await updateOrganizationById(organizationId, body);

  response.json({
    organization: updatedOrganization,
  });
}

const router = Router();

router
  .route('/')
  .get(validateGetOrganizations, asyncHandler(getOrganizationsHandler))
  .post(validateCreateOrganization, asyncHandler(createOrganizationHandler));

router
  .route('/:organizationId')
  .delete(validateDeleteOrganization, asyncHandler(deleteOrganizationHandler))
  .get(validateGetOrganization, asyncHandler(getOrganizationHandler))
  .patch(validateUpdateOrganization, asyncHandler(updateOrganizationHandler));

router.use('/:organizationId/teams', validateGetOrganization, teamRoutes);
router.use('/:organizationId/users', validateGetOrganization, userRoutes);

export default router;
