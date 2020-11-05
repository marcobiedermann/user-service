import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('routes/api/logout', () => {
  describe('get /logout', () => {
    it('should redirect to `/`', async () => {
      expect.assertions(2);

      const response = await request.get('/logout');

      expect(response.status).toStrictEqual(302);
      expect(response.header.location).toStrictEqual('/');
    });
  });
});
