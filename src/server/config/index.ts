import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  session: {
    secret: string;
  };
  mongodbUri: string;
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
  twitter: {
    consumerKey: string;
    consumerSecret: string;
    callbackUrl: string;
  };
}

const config: IConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  session: {
    secret: process.env.SESSION_SECRET,
  },
  mongodbUri: process.env.MONGODB_URI,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL,
  },
};

export { config };
