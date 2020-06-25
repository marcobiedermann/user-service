/* eslint-disable camelcase */

import { DataTypes, QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable('organization_users');
}

async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  return queryInterface.createTable(
    'organization_users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      organization_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'organizations',
        },
        type: DataTypes.UUID,
      },
      user_id: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'users',
        },
        type: DataTypes.UUID,
      },
    },
    {
      uniqueKeys: {
        organization_users_organization_id_user_id_key: {
          fields: ['organization_id', 'user_id'],
        },
      },
    },
  );
}

export { down, up };
