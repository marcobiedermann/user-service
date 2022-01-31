import faker from '@faker-js/faker';
import supertest from 'supertest';
import app from '../../../../../../app';

jest.mock('../../../../../../services/team');

describe('routes/api/v1/users/:userId', () => {
  describe('get /teams', () => {
    it('should return teams by user', async () => {
      expect.assertions(3);

      const userId = faker.datatype.uuid();
      const response = await supertest(app).get(`/api/v1/users/${userId}/teams`);

      expect(response.status).toStrictEqual(200);
      expect(response.body.teams).toHaveLength(1);
      expect(response.body.teams).toContainEqual({
        id: expect.any(String),
        name: 'Marketing',
      });
    });
  });
});
