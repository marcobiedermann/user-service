import * as mongoose from 'mongoose';

interface IAuthToken {
  id: string;
  token: string;
}
interface IUserDocument extends mongoose.Document {
  github: IAuthToken;
  google: IAuthToken;
  twitter: IAuthToken;
}

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

const User = mongoose.model<IUserDocument>('User', userSchema);

export { User };
