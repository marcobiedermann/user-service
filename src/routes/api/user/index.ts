import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
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

router.route('/').get(asyncHandler(getUsers)).post(asyncHandler(createUser));

router
  .route('/:userId')
  .delete(asyncHandler(deleteUser))
  .get(asyncHandler(getUser))
  .patch(asyncHandler(updateUser));

router.use('/:userId/organizations', organizationRoutes);
router.use('/:userId/teams', teamRoutes);

export default router;
