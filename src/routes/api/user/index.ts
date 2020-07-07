import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import * as organizationService from '../../../services/organization';
import * as teamService from '../../../services/team';
import * as userService from '../../../services/user';

const router = Router();

async function createUser(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdUser = await userService.createUser(body);

  response.json({
    user: createdUser,
  });
}

async function deleteUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const deletedUser = await userService.deleteUserById(userId);

  response.json({
    user: deletedUser,
  });
}

async function getUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw createError(400, `User ${userId} not found`);
  }

  response.json({
    user,
  });
}

async function getUsers(_request: Request, response: Response): Promise<void> {
  const users = await userService.getUsers();

  response.json({
    users,
  });
}

async function updateUser(request: Request, response: Response): Promise<void> {
  const { body, params } = request;
  const { userId } = params;

  const updatedUser = await userService.updateUserById(userId, body);

  response.json({
    user: updatedUser,
  });
}

async function getOrganizationsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const organizations = await organizationService.getOrganizationsByUserId(userId);

  response.json({
    organizations,
  });
}

async function getTeamsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const teams = await teamService.getTeamsByUserId(userId);

  response.json({
    teams,
  });
}

router.route('/').get(asyncHandler(getUsers)).post(asyncHandler(createUser));

router
  .route('/:userId')
  .delete(asyncHandler(deleteUser))
  .get(asyncHandler(getUser))
  .patch(asyncHandler(updateUser));

router.route('/:userId/organizations').get(asyncHandler(getOrganizationsByUser));

router.route('/:userId/teams').get(asyncHandler(getTeamsByUser));

export default router;
