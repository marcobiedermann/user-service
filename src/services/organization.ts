import { Organization } from '@prisma/client';
import prisma from '../config/prisma';

async function createOrganization(data: { name: string }): Promise<Organization> {
  const createdOrganization = await prisma.organization.create({
    data,
  });

  return createdOrganization;
}

async function deleteOrganizationById(organizationId: string): Promise<Organization> {
  const deletedOrganization = await prisma.organization.delete({
    where: {
      id: organizationId,
    },
  });

  return deletedOrganization;
}

async function getOrganizationById(organizationId: string): Promise<Organization | null> {
  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  return organization;
}

async function getOrganizations(): Promise<Organization[]> {
  const organizations = await prisma.organization.findMany();

  return organizations;
}

async function getOrganizationsByUserId(userId: string): Promise<Organization[]> {
  const organizations = await prisma.organization.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
  });

  return organizations;
}

async function updateOrganizationById(
  organizationId: string,
  data: {
    name?: string;
  },
): Promise<Organization> {
  const updatedOrganization = await prisma.organization.update({
    where: {
      id: organizationId,
    },
    data,
  });

  return updatedOrganization;
}

export {
  createOrganization,
  deleteOrganizationById,
  getOrganizationById,
  getOrganizations,
  getOrganizationsByUserId,
  updateOrganizationById,
};
