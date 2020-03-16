import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Organization extends Model {
  public id!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Organization.init(
  {
    id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
  },
);

export default Organization;
