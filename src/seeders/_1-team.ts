/* eslint-disable @typescript-eslint/ban-types */

import faker from 'faker';
import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('teams', {});
}

function up(queryInterface: QueryInterface): Promise<number | object> {
  return queryInterface.bulkInsert('teams', [
    {
      name: faker.commerce.department(),
    },
  ]);
}

export { down, up };
