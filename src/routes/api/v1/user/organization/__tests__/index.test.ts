import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../../../../../app';

jest.mock('../../../../../../services/organization');

describe('routes/api/v1/users/:userId', () => {
  describe('get /organizations', () => {
    it('should return organizations by user', async () => {
      expect.assertions(3);

      const userId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/users/${userId}/organizations`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.organizations).toHaveLength(1);
      expect(response.body.organizations).toContainEqual({
        id: expect.any(String),
        name: 'Apple',
      });
    });
  });
});
