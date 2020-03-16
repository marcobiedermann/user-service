import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class User extends Model {
  public id!: string;

  public githubId!: string;

  public googleId!: string;

  public mail!: string;

  public name!: string;

  public twitterId!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    githubId: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    mail: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    twitterId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
  },
);

export default User;
