import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

describe('routes/api', () => {
  describe('get /', () => {
    it('should redirect to `/api-docs`', async () => {
      expect.assertions(2);

      const response = await request.get('/');

      expect(response.status).toStrictEqual(302);
      expect(response.header.location).toStrictEqual('/api-docs');
    });
  });
});
