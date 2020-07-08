import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetTeams } from '../../../../middlewares/validation/team';
import { getTeamsByUserId } from '../../../../services/team';

async function getTeamsByUserHandler(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { userId } = params;

  const teams = await getTeamsByUserId(userId);

  response.json({
    teams,
  });
}

const router = Router();

router.route('/').get(validateGetTeams, asyncHandler(getTeamsByUserHandler));

export default router;
