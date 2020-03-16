import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class TeamUser extends Model {
  public id!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

TeamUser.init(
  {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    underscored: true,
  },
);

export default TeamUser;
