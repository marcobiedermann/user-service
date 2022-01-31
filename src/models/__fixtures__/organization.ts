interface Organization {
  id: string;
  name: string;
}

type OrganizationCreationAttributes = Pick<Organization, 'name'>;
type OrganizationUpdateAttributes = Pick<Organization, 'name'>;

const organization: Organization = {
  id: '12345678-9012-3456-7890-123456789012',
  name: 'Apple',
};

export default organization;

export { Organization, OrganizationCreationAttributes, OrganizationUpdateAttributes };
