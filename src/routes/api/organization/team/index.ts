import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetTeams } from '../../../../middlewares/validation/team';
import * as teamService from '../../../../services/team';

async function getTeamsByOrganization(request: Request, response: Response): Promise<void> {
  const { params } = request;
  const { organizationId } = params;

  const teams = await teamService.getTeamsByOrganizationId(organizationId);

  response.json({
    teams,
  });
}

const router = Router();

router.route('/').get(validateGetTeams, asyncHandler(getTeamsByOrganization));

export default router;
