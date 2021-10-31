import jwt from 'jsonwebtoken';
import config from '../config';

function signAccessToken(payload: string | Record<string, unknown> | Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwt.accessToken.secret,
      {
        expiresIn: config.jwt.accessToken.expiresIn,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      },
    );
  });
}

function signRefreshToken(payload: string | Record<string, unknown> | Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwt.refreshToken.secret,
      {
        expiresIn: config.jwt.refreshToken.expiresIn,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      },
    );
  });
}

function verifyAccessToken(accessToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.jwt.accessToken.secret, (error, decoded) => {
      if (error) {
        reject(error);
      }

      resolve(decoded);
    });
  });
}

function verifyRefreshToken(refreshToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwt.refreshToken.secret, (error, decoded) => {
      if (error) {
        reject(error);
      }

      resolve(decoded);
    });
  });
}

export { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
