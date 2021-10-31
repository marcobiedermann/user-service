import supertest from 'supertest';
import app from '../app';

describe('routes/api', () => {
  describe('get /', () => {
    it('should redirect to `/api-docs`', async () => {
      expect.assertions(2);

      const response = await supertest(app).get('/');

      expect(response.status).toStrictEqual(302);
      expect(response.header.location).toStrictEqual('/api-docs');
    });
  });
});
