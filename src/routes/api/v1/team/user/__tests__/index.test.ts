import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../../../../../app';

jest.mock('../../../../../../services/user');

describe('routes/api/v1/teams/:teamId', () => {
  describe('get /users', () => {
    it('should return users by team', async () => {
      expect.assertions(3);

      const teamId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/teams/${teamId}/users`);

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
