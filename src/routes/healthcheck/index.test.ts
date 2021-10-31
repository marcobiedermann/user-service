import supertest from 'supertest';
import app from '../../app';

describe('routes/healthcheck', () => {
  describe('get /healthcheck', () => {
    it('should respond with 200', async () => {
      expect.assertions(3);

      const response = await supertest(app).get('/healthcheck');

      expect(response.status).toStrictEqual(200);
      expect(response.header['content-type']).toStrictEqual('application/json; charset=utf-8');
      expect(response.body).toHaveProperty('uptime');
    });
  });
});
