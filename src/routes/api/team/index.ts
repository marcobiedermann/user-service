import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import {
  validateCreateTeam,
  validateDeleteTeam,
  validateGetTeam,
  validateGetTeams,
  validateUpdateTeam,
} from '../../../middlewares/validation/team';
import * as teamService from '../../../services/team';
import userRoutes from './user';

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
  const { teamId } = params;

  const deletedTeam = await teamService.deleteTeamById(teamId);

  response.json({
    team: deletedTeam,
  });
}

async function getTeam(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { teamId } = params;

  const team = await teamService.getTeamById(teamId);

  if (!team) {
    throw createError(400, `Team ${teamId} not found`);
  }

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
  const { teamId } = params;

  const updatedTeam = await teamService.updateTeamById(teamId, body);

  response.json({
    team: updatedTeam,
  });
}

router
  .route('/')
  .get(validateGetTeams, asyncHandler(getTeams))
  .post(validateCreateTeam, asyncHandler(createTeam));

router
  .route('/:teamId')
  .delete(validateDeleteTeam, asyncHandler(deleteTeam))
  .get(validateGetTeam, asyncHandler(getTeam))
  .patch(validateUpdateTeam, asyncHandler(updateTeam));

router.use('/:teamId/users', validateGetTeam, userRoutes);

export default router;
