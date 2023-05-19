import { Team } from '@prisma/client';
import prisma from '../config/prisma';

async function createTeam(data: { name: string }): Promise<Team> {
  const createdTeam = await prisma.team.create({
    data,
  });

  return createdTeam;
}

async function deleteTeamById(teamId: string): Promise<Team> {
  const deletedTeam = await prisma.team.delete({
    where: {
      id: teamId,
    },
  });

  return deletedTeam;
}

async function getTeamById(teamId: string): Promise<Team | null> {
  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
  });

  return team;
}

async function getTeams(): Promise<Team[]> {
  const teams = await prisma.team.findMany();

  return teams;
}

async function getTeamsByOrganizationId(organizationId: string): Promise<Team[]> {
  const teams = await prisma.team.findMany({
    where: {
      organizationId,
    },
  });

  return teams;
}

async function getTeamsByUserId(userId: string): Promise<Team[]> {
  const teams = await prisma.team.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });

  return teams;
}

async function updateTeamById(
  teamId: string,
  data: {
    name?: string;
  },
): Promise<Team> {
  const updatedTeam = await prisma.team.update({
    where: {
      id: teamId,
    },
    data,
  });

  return updatedTeam;
}

export {
  createTeam,
  deleteTeamById,
  getTeamById,
  getTeams,
  getTeamsByOrganizationId,
  getTeamsByUserId,
  updateTeamById,
};
