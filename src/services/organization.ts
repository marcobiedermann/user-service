import { FindOptions, WhereOptions } from 'sequelize';
import { Organization, User } from '../models';

function countOrganizations(where?: WhereOptions): Promise<number> {
  return Organization.count({ where });
}

function createOrganization(values: object): Promise<Organization> {
  return Organization.create(values);
}

function deleteOrganizationById(organizationId: string): Promise<number> {
  return Organization.destroy({
    where: {
      id: organizationId,
    },
  });
}

function getOrganization(where: WhereOptions): Promise<Organization> {
  return Organization.findOne({
    where,
  });
}

function getOrganizationById(organizationId: string): Promise<Organization> {
  return Organization.findByPk(organizationId);
}

function getOrganizations(options?: FindOptions): Promise<Organization[]> {
  return Organization.findAll(options);
}

function getAndCountOrganizations(options?: FindOptions): Promise<[number, Organization[]]> {
  return Promise.all([countOrganizations(options?.where), getOrganizations(options)]);
}

function getOrganizationsByUserId(userId: string): Promise<Organization[]> {
  return Organization.findAll({
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

function updateOrganizationById(
  organizationId: string,
  values: object,
): Promise<[number, Organization[]]> {
  return Organization.update(values, {
    where: {
      id: organizationId,
    },
  });
}

export {
  countOrganizations,
  createOrganization,
  deleteOrganizationById,
  getAndCountOrganizations,
  getOrganization,
  getOrganizationById,
  getOrganizations,
  getOrganizationsByUserId,
  updateOrganizationById,
};
