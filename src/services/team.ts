import { FindOptions, WhereOptions } from 'sequelize';
import { Team, User } from '../models';

function countTeams(where?: WhereOptions): Promise<number> {
  return Team.count({ where });
}

function createTeam(values: Record<string, unknown>): Promise<Team> {
  return Team.create(values);
}

function deleteTeamById(teamId: string): Promise<number> {
  return Team.destroy({
    where: {
      id: teamId,
    },
  });
}

function getTeam(where: WhereOptions): Promise<Team | null> {
  return Team.findOne({
    where,
  });
}

function getTeamById(teamId: string): Promise<Team | null> {
  return Team.findByPk(teamId);
}

function getTeams(options?: FindOptions): Promise<Team[]> {
  return Team.findAll(options);
}

function getAndCountTeams(options?: FindOptions): Promise<[number, Team[]]> {
  return Promise.all([countTeams(options?.where), getTeams(options)]);
}

function getTeamsByOrganizationId(organizationId: string): Promise<Team[]> {
  return Team.findAll({
    where: {
      organizationId,
    },
  });
}

function getTeamsByUserId(userId: string): Promise<Team[]> {
  return Team.findAll({
    include: [
      {
        attributes: [],
        model: User,
        where: {
          id: userId,
        },
      },
    ],
  });
}

function updateTeamById(
  teamId: string,
  values: Record<string, unknown>,
): Promise<[number, Team[]]> {
  return Team.update(values, {
    where: {
      id: teamId,
    },
  });
}

export {
  countTeams,
  createTeam,
  deleteTeamById,
  getTeam,
  getTeamById,
  getTeams,
  getAndCountTeams,
  getTeamsByOrganizationId,
  getTeamsByUserId,
  updateTeamById,
};
