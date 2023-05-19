import { User } from '@prisma/client';
import prisma from '../config/prisma';

async function createUser(data: {
  mail: string;
  name: string;
  githubId?: string;
  googleId?: string;
  twitterId?: string;
}): Promise<User> {
  const createdUser = await prisma.user.create({
    data,
  });

  return createdUser;
}

async function deleteUserById(userId: string): Promise<User> {
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return deletedUser;
}

async function getUser(
  where: { githubId: string } | { googleId: string } | { twitterId: string },
): Promise<User | null> {
  const user = await prisma.user.findFirst({
    where,
  });

  return user;
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany();

  return users;
}

async function getUsersByOrganizationId(organizationId: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      organizations: {
        some: {
          organizationId,
        },
      },
    },
  });

  return users;
}

async function getUsersByTeamId(teamId: string): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      teams: {
        some: {
          teamId,
        },
      },
    },
  });

  return users;
}

async function updateUserById(
  userId: string,
  data: {
    mail?: string;
    name?: string;
    gitubId?: string;
    googleId?: string;
    twitterId?: string;
  },
): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

  return updatedUser;
}

export {
  createUser,
  deleteUserById,
  getUser,
  getUserById,
  getUsers,
  getUsersByOrganizationId,
  getUsersByTeamId,
  updateUserById,
};
