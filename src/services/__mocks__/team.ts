import team, {
  Team,
  TeamCreationAttributes,
  TeamUpdateAttributes,
} from '../../models/__fixtures__/team';

function createTeam(attributes: TeamCreationAttributes): Promise<Team> {
  return Promise.resolve({
    ...team,
    ...attributes,
  });
}

function deleteTeamById(): Promise<number> {
  return Promise.resolve(1);
}

function getTeams(): Promise<Team[]> {
  return Promise.resolve([team]);
}

function getTeamById(teamId: string): Promise<Team> {
  return Promise.resolve({
    ...team,
    id: teamId,
  });
}

function getTeamsByOrganizationId(): Promise<Team[]> {
  return Promise.resolve([team]);
}

function getTeamsByUserId(): Promise<Team[]> {
  return Promise.resolve([team]);
}

function updateTeamById(teamId: string, attributes: TeamUpdateAttributes): Promise<Team> {
  return Promise.resolve({
    ...team,
    id: teamId,
    ...attributes,
  });
}

export {
  createTeam,
  deleteTeamById,
  getTeams,
  getTeamById,
  getTeamsByOrganizationId,
  getTeamsByUserId,
  updateTeamById,
};
