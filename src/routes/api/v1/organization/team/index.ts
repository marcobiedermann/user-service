import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateGetTeams } from '../../../../../middlewares/validation/team';
import { getTeamsByOrganizationId } from '../../../../../services/team';

async function getTeamsByOrganizationHandler(request: Request, response: Response): Promise<void> {
  const {
    params: { organizationId },
  } = request;

  const teams = await getTeamsByOrganizationId(organizationId);

  response.json({
    teams,
  });
}

const router = Router({ mergeParams: true });

router.route('/').get(validateGetTeams, asyncHandler(getTeamsByOrganizationHandler));

export default router;
