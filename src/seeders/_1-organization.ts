/* eslint-disable @typescript-eslint/ban-types */

import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('Organization', {});
}

function up(queryInterface: QueryInterface): Promise<number | object> {
  return queryInterface.bulkInsert('Organization', [
    {
      name: 'moovel',
    },
  ]);
}

export { down, up };
