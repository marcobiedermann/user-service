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
  const {
    params: { userId },
  } = request;

  await deleteUserById(userId);

  response.sendStatus(StatusCodes.NO_CONTENT);
}

async function getUserHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { userId },
  } = request;

  const user = await getUserById(userId);

  if (!user) {
    throw createError(StatusCodes.NOT_FOUND, `User ${userId} not found`);
  }

  response.json({
    user,
  });
}

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  foo: string;
}

async function getUsersHandler(
  request: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  response: Response,
): Promise<void> {
  const { params, query, body } = request;

  const users = await getUsers();

  response.json({
    users,
  });
}

async function updateUserHandler(request: Request, response: Response): Promise<void> {
  const {
    body,
    params: { userId },
  } = request;

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
