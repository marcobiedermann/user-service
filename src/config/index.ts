import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: `.env.${env}`,
});

type Level = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

interface Logger {
  level: Level;
}

interface Database {
  url: string;
}

interface Config {
  env: string;
  github: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
    callbackUrl: string;
  };
  jwt: {
    accessToken: {
      expiresIn: string;
      secret: string;
    };
    refreshToken: {
      expiresIn: string;
      secret: string;
    };
  };
  logger: Logger;
  port: number;
  database: Database;
  twitter: {
    consumerKey: string;
    consumerSecret: string;
    callbackUrl: string;
  };
}

const config: Config = {
  env,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
  },
  jwt: {
    accessToken: {
      expiresIn: '1h',
      secret: process.env.ACCESS_TOKEN_SECRET || '',
    },
    refreshToken: {
      expiresIn: '7d',
      secret: process.env.REFRESH_TOKEN_SECRET || '',
    },
  },
  logger: {
    level: 'debug',
  },
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:example@localhost:5432/postgres',
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || '',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '',
    callbackUrl: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback',
  },
};

export default config;
