import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../../../../../app';

jest.mock('../../../../../../services/user');

describe('routes/api/v1/organizations/:organizationId', () => {
  describe('get /users', () => {
    it('should return users by organization', async () => {
      expect.assertions(3);

      const organizationId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/organizations/${organizationId}/users`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.users).toHaveLength(1);
      expect(response.body.users).toContainEqual({
        id: expect.any(String),
        mail: 'john.doe@gmail.com',
        name: 'John Doe',
      });
    });
  });
});
