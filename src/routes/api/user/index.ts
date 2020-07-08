import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateGetUsers,
  validateUpdateUser,
} from '../../../middlewares/validation/user';
import * as userService from '../../../services/user';
import organizationRoutes from './organization';
import teamRoutes from './team';

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

async function getUsers(request: Request, response: Response): Promise<void> {
  console.log({ query: request.query });
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

router
  .route('/')
  .get(validateGetUsers, asyncHandler(getUsers))
  .post(validateCreateUser, asyncHandler(createUser));

router
  .route('/:userId')
  .delete(validateDeleteUser, asyncHandler(deleteUser))
  .get(validateGetUser, asyncHandler(getUser))
  .patch(validateUpdateUser, asyncHandler(updateUser));

router.use('/:userId/organizations', validateGetUser, organizationRoutes);
router.use('/:userId/teams', validateGetUser, teamRoutes);

export default router;
