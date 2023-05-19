import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import {
  validateCreateTeam,
  validateDeleteTeam,
  validateGetTeam,
  validateGetTeams,
  validateUpdateTeam,
} from '../../../../middlewares/validation/team';
import {
  createTeam,
  deleteTeamById,
  getTeamById,
  getTeams,
  updateTeamById,
} from '../../../../services/team';
import userRoutes from './user';

async function createTeamHandler(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const createdTeam = await createTeam(body);

  response.status(StatusCodes.CREATED).json({
    team: createdTeam,
  });
}

async function deleteTeamHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { teamId },
  } = request;

  await deleteTeamById(teamId);

  response.sendStatus(StatusCodes.NO_CONTENT);
}

async function getTeamHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { teamId },
  } = request;

  const team = await getTeamById(teamId);

  if (!team) {
    throw createError(StatusCodes.NOT_FOUND, `Team ${teamId} not found`);
  }

  response.json({
    team,
  });
}

async function getTeamsHandler(_request: Request, response: Response): Promise<void> {
  const teams = await getTeams();

  response.json({
    teams,
  });
}

async function updateTeamHandler(request: Request, response: Response): Promise<void> {
  const {
    body,
    params: { teamId },
  } = request;

  const updatedTeam = await updateTeamById(teamId, body);

  response.json({
    team: updatedTeam,
  });
}

const router = Router();

router
  .route('/')
  .get(validateGetTeams, asyncHandler(getTeamsHandler))
  .post(validateCreateTeam, asyncHandler(createTeamHandler));

router
  .route('/:teamId')
  .delete(validateDeleteTeam, asyncHandler(deleteTeamHandler))
  .get(validateGetTeam, asyncHandler(getTeamHandler))
  .patch(validateUpdateTeam, asyncHandler(updateTeamHandler));

router.use('/:teamId/users', validateGetTeam, userRoutes);

export default router;
