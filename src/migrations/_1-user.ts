import { DataTypes, QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable('users');
}

async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    github_id: {
      type: DataTypes.STRING,
    },
    google_id: {
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
    twitter_id: {
      type: DataTypes.STRING,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
}

export { down, up };
