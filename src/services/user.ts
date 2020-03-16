import { FindOptions, WhereOptions } from 'sequelize';
import { Organization, Team, User } from '../models';

function countUsers(where?: WhereOptions): Promise<number> {
  return User.count({ where });
}

function createUser(values?: object): Promise<User> {
  return User.create(values);
}

function deleteUserById(userId: string): Promise<number> {
  return User.destroy({
    where: {
      id: userId,
    },
  });
}

function getUser(where: WhereOptions): Promise<User> {
  return User.findOne({
    where,
  });
}

function getUserById(userId: string): Promise<User> {
  return User.findByPk(userId);
}

function getUsers(options?: FindOptions): Promise<User[]> {
  return User.findAll(options);
}

function getAndCountUsers(options?: FindOptions): Promise<[number, User[]]> {
  return Promise.all([countUsers(options?.where), getUsers(options)]);
}

function getUsersByOrganizationId(organizationId: string): Promise<User[]> {
  return User.findAll({
    include: [
      {
        attributes: [],
        model: Organization,
        where: {
          id: organizationId,
        },
      },
    ],
  });
}

function getUsersByTeamId(teamId: string): Promise<User[]> {
  return User.findAll({
    include: [
      {
        attributes: [],
        model: Team,
        where: {
          id: teamId,
        },
      },
    ],
  });
}

function updateUserById(userId: string, values: object): Promise<[number, User[]]> {
  return User.update(values, {
    where: {
      id: userId,
    },
  });
}

export {
  countUsers,
  createUser,
  deleteUserById,
  getAndCountUsers,
  getUser,
  getUserById,
  getUsers,
  getUsersByOrganizationId,
  getUsersByTeamId,
  updateUserById,
};
