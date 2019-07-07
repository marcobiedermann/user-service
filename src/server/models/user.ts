import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  github: {
    id: String,
    token: String,
  },
  google: {
    id: String,
    token: String,
  },
  twitter: {
    id: String,
    token: String,
  },
});

const User = mongoose.model('User', userSchema);

export { User };
