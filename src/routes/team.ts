import { Request, Response, Router } from 'express';
import * as teamService from '../services/team';
import * as userService from '../services/user';

const router = Router();

async function createTeam(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdTeam = await teamService.createTeam(body);

  response.json({
    team: createdTeam,
  });
}

async function deleteTeam(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const deletedTeam = await teamService.deleteTeamById(params.teamId);

  response.json({
    team: deletedTeam,
  });
}

async function getTeam(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const team = await teamService.getTeamById(params.teamId);

  response.json({
    team,
  });
}

async function getTeams(_request: Request, response: Response): Promise<void> {
  const teams = await teamService.getTeams();

  response.json({
    teams,
  });
}

async function updateTeam(request: Request, response: Response): Promise<void> {
  const { body, params } = request;

  const updatedTeam = await teamService.updateTeamById(params.teamId, body);

  response.json({
    team: updatedTeam,
  });
}

async function getUsersByTeam(request: Request, response: Response): Promise<void> {
  const { params } = request;

  const users = await userService.getUsersByOrganizationId(params.teamId);

  response.json({
    users,
  });
}

router
  .route('/teams')
  .get(getTeams)
  .post(createTeam);

router
  .route('/teams/:teamId')
  .delete(deleteTeam)
  .get(getTeam)
  .patch(updateTeam);

router.route('/teams/:teamId/users').get(getUsersByTeam);

export default router;
