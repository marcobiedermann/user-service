import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

class Team extends Model {
  public id!: string;

  public organizationId!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Team.init(
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
    // organizationId: {
    //   references: {
    //     model: Organization,
    //   },
    //   type: DataTypes.UUID,
    // },
  },
  {
    sequelize,
    underscored: true,
  },
);

export default Team;
