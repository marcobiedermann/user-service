require('dotenv').config();

const config = {
  port: process.env.PORT,
  session: {
    secret: process.env.SESSION_SECRET,
  },
  mongodbUri: process.env.MONGODB_URI,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: '/auth/github/callback',
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: '/auth/twitter/callback',
  },
};

module.exports = config;
