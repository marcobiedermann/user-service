import dotenv from 'dotenv';

dotenv.config({
  path: `files/env/.env.${process.env.NODE_ENV}`,
});

type Dialects = 'postgres';

interface Postgres {
  database: string;
  dialect: Dialects;
  host: string;
  password: string;
  port: number;
  username: string;
}

interface Config {
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
  port: number;
  postgres: Postgres;
  twitter: {
    consumerKey: string;
    consumerSecret: string;
    callbackUrl: string;
  };
}

const config: Config = {
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
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  postgres: {
    database: process.env.POSTGRES_DB || 'postgres',
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    password: process.env.POSTGRES_PASSWORD || 'example',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
    username: process.env.POSTGRES_USER || 'postgres',
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || '',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || '',
    callbackUrl: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3000/auth/twitter/callback',
  },
};

export default config;
