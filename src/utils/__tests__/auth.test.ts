import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from '../auth';

describe('auth', () => {
  describe('signAccessToken', () => {
    it('should create a new access token', async () => {
      expect.assertions(1);

      const user = { id: 'FAKE_USER_ID' };
      const accessToken = await signAccessToken(user);
      const decoded = await verifyAccessToken(accessToken);

      expect(decoded).toMatchObject({
        iat: expect.any(Number),
        exp: expect.any(Number),
        id: user.id,
      });
    });
  });

  describe('signRefreshToken', () => {
    it('should create a new refresh token', async () => {
      expect.assertions(1);

      const user = { id: 'FAKE_USER_ID' };
      const refreshToken = await signRefreshToken(user);
      const decoded = await verifyRefreshToken(refreshToken);

      expect(decoded).toMatchObject({
        iat: expect.any(Number),
        exp: expect.any(Number),
        id: user.id,
      });
    });
  });
});
