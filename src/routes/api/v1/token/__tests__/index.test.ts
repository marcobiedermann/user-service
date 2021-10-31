import supertest from 'supertest';
import app from '../../../../../app';
import { signRefreshToken } from '../../../../../utils/auth';

describe('/tokens', () => {
  describe('post /tokens', () => {
    it('should create a new refresh token', async () => {
      expect.assertions(2);

      const user = { id: 'FAKE_USER_ID' };
      const refreshToken = await signRefreshToken(user);

      const response = await supertest(app).post('/api/v1/tokens').send({
        refreshToken,
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
