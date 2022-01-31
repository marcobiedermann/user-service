import organization, {
  Organization,
  OrganizationCreationAttributes,
  OrganizationUpdateAttributes,
} from '../../models/__fixtures__/organization';

function createOrganization(attributes: OrganizationCreationAttributes): Promise<Organization> {
  return Promise.resolve({
    ...organization,
    ...attributes,
  });
}

function deleteOrganizationById(): Promise<number> {
  return Promise.resolve(1);
}

function getOrganizations(): Promise<Organization[]> {
  return Promise.resolve([organization]);
}

function getOrganizationById(organizationId: string): Promise<Organization> {
  return Promise.resolve({
    ...organization,
    id: organizationId,
  });
}

function getOrganizationsByUserId(): Promise<Organization[]> {
  return Promise.resolve([organization]);
}

function updateOrganizationById(
  organizationId: string,
  attributes: OrganizationUpdateAttributes,
): Promise<Organization> {
  return Promise.resolve({
    ...organization,
    id: organizationId,
    ...attributes,
  });
}

export {
  createOrganization,
  deleteOrganizationById,
  getOrganizations,
  getOrganizationById,
  getOrganizationsByUserId,
  updateOrganizationById,
};
