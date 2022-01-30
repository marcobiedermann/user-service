import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetUser,
  validateGetUsers,
  validateUpdateUser,
} from '../../../../middlewares/validation/user';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from '../../../../services/user';
import organizationRoutes from './organization';
import teamRoutes from './team';

async function createUserHandler(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdUser = await createUser(body);

  response.status(StatusCodes.CREATED).json({
    user: createdUser,
  });
}

async function deleteUserHandler(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  await deleteUserById(userId);

  response.sendStatus(StatusCodes.NO_CONTENT);
}

async function getUserHandler(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const user = await getUserById(userId);

  if (!user) {
    throw createError(StatusCodes.NOT_FOUND, `User ${userId} not found`);
  }

  response.json({
    user,
  });
}

async function getUsersHandler(_request: Request, response: Response): Promise<void> {
  const users = await getUsers();

  response.json({
    users,
  });
}

async function updateUserHandler(request: Request, response: Response): Promise<void> {
  const { body, params } = request;
  const { userId } = params;

  const updatedUser = await updateUserById(userId, body);

  response.json({
    user: updatedUser,
  });
}

const router = Router();

router
  .route('/')
  .get(validateGetUsers, asyncHandler(getUsersHandler))
  .post(validateCreateUser, asyncHandler(createUserHandler));

router
  .route('/:userId')
  .delete(validateDeleteUser, asyncHandler(deleteUserHandler))
  .get(validateGetUser, asyncHandler(getUserHandler))
  .patch(validateUpdateUser, asyncHandler(updateUserHandler));

router.use('/:userId/organizations', validateGetUser, organizationRoutes);
router.use('/:userId/teams', validateGetUser, teamRoutes);

export default router;
