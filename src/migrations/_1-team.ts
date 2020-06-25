/* eslint-disable camelcase */

import { DataTypes, QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable('teams');
}

async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return queryInterface.createTable('teams', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      allowNull: false,
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
