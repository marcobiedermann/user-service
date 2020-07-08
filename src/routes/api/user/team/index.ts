import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetTeams } from '../../../../middlewares/validation/team';
import * as teamService from '../../../../services/team';

async function getTeamsByUser(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const teams = await teamService.getTeamsByUserId(userId);

  response.json({
    teams,
  });
}

const router = Router();

router.route('/').get(validateGetTeams, asyncHandler(getTeamsByUser));

export default router;
