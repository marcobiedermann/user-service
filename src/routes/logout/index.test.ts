import supertest from 'supertest';
import app from '../../app';

describe('routes/api/logout', () => {
  describe('get /logout', () => {
    it('should redirect to `/`', async () => {
      expect.assertions(2);

      const response = await supertest(app).get('/logout');

      expect(response.status).toStrictEqual(302);
      expect(response.header.location).toStrictEqual('/');
    });
  });
});
