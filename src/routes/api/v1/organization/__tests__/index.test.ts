import supertest from 'supertest';
import faker from '@faker-js/faker';
import app from '../../../../../app';
import * as organizationService from '../../../../../services/organization';

jest.mock('../../../../../services/organization');

describe('routes/api/v1', () => {
  describe('get /organizations', () => {
    it('should return organizations', async () => {
      expect.assertions(3);

      const response = await supertest(app).get('/api/v1/organizations');

      expect(response.status).toStrictEqual(200);
      expect(response.body.organizations).toHaveLength(1);
      expect(response.body.organizations).toContainEqual({
        id: expect.any(String),
        name: 'Apple',
      });
    });
  });

  describe('post /organizations/', () => {
    it('should create a single organization', async () => {
      expect.assertions(2);

      const organizationAttributes = {
        name: faker.company.companyName(),
      };

      const response = await supertest(app)
        .post('/api/v1/organizations')
        .send(organizationAttributes);

      expect(response.status).toStrictEqual(201);
      expect(response.body.organization.name).toStrictEqual(organizationAttributes.name);
    });

    it('should throw an error if `name` is missing', async () => {
      expect.assertions(3);

      const organizationAttributes = {
        mail: faker.internet.email(),
      };

      const response = await supertest(app)
        .post('/api/v1/organizations')
        .send(organizationAttributes);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.body.message).toMatchInlineSnapshot(
        `"\\"name\\" is required"`,
      );
    });
  });

  describe('delete /organizations/:organizationId', () => {
    it('should delete a single organization', async () => {
      expect.assertions(2);

      const organizationId = faker.datatype.uuid();
      const response = await supertest(app).delete(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(204);
      expect(response.body).toMatchObject({});
    });

    it('should throw an error if `organizationId` is not a `UUID`', async () => {
      expect.assertions(3);

      const organizationId = 'invalidOrganizationId';
      const response = await supertest(app).delete(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"organizationId\\" must be a valid GUID"`,
      );
    });
  });

  describe('get /organizations/:organizationId', () => {
    it('should return a single organization', async () => {
      expect.assertions(2);

      const organizationId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.organization.id).toStrictEqual(organizationId);
    });

    it('should throw an error if `organizationId` is not a `UUID`', async () => {
      expect.assertions(3);

      const organizationId = 'invalidorganizationId';
      const response = await supertest(app).get(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"organizationId\\" must be a valid GUID"`,
      );
    });

    it('should throw an error if organization is not found', async () => {
      expect.assertions(3);

      const spy = jest
        .spyOn(organizationService, 'getOrganizationById')
        .mockImplementation(() => Promise.resolve(null));

      const organizationId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(404);
      expect(response.body.message).toStrictEqual(`Organization ${organizationId} not found`);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('patch /organizations/:organizationId', () => {
    it('should update a single organization', async () => {
      expect.assertions(3);

      const organizationId = faker.datatype.uuid();
      const organizationAttributes = {
        name: faker.company.companyName(),
      };

      const response = await supertest(app)
        .patch(`/api/v1/organizations/${organizationId}`)
        .send(organizationAttributes);

      expect(response.status).toStrictEqual(200);
      expect(response.body.organization.id).toStrictEqual(organizationId);
      expect(response.body.organization.name).toStrictEqual(organizationAttributes.name);
    });

    it('should throw an error if `organizationId` is not a `UUID`', async () => {
      expect.assertions(3);

      const organizationId = 'invalidOrganizationId';
      const response = await supertest(app).patch(`/api/v1/organizations/${organizationId}`);

      expect(response.status).toStrictEqual(400);
      expect(response.body.error).toStrictEqual('Bad Request');
      expect(response.body.validation.params.message).toMatchInlineSnapshot(
        `"\\"organizationId\\" must be a valid GUID"`,
      );
    });
  });
});
