import supertest from 'supertest';
import app from '../../app';

describe('routes/api-docs', () => {
  describe('get /api-docs', () => {
    it('should response with 200', async () => {
      expect.assertions(2);

      const response = await supertest(app).get('/api-docs/');

      expect(response.status).toStrictEqual(200);
      expect(response.header['content-type']).toStrictEqual('text/html; charset=utf-8');
    });
  });
});
