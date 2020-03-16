import { Request, Response, Router } from 'express';
import * as organizationService from '../services/organization';
import * as teamService from '../services/team';
import * as userService from '../services/user';

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

  const deletedUser = await userService.deleteUserById(params.userId);

  response.json({
    user: deletedUser,
  });
}

async function getUser(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const user = await userService.getUserById(params.userId);

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

  const updatedUser = await userService.updateUserById(params.userId, body);

  response.json({
    user: updatedUser,
  });
}

async function getOrganizationsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const organizations = await organizationService.getOrganizationsByUserId(params.userId);

  response.json({
    organizations,
  });
}

async function getTeamsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const teams = await teamService.getTeamsByUserId(params.userId);

  response.json({
    teams,
  });
}

router
  .route('/users')
  .get(getUsers)
  .post(createUser);

router
  .route('/users/:userId')
  .delete(deleteUser)
  .get(getUser)
  .patch(updateUser);

router.route('/users/:userId/organizations').get(getOrganizationsByUser);

router.route('/users/:userId/teams').get(getTeamsByUser);

export default router;
