/* eslint-disable @typescript-eslint/ban-types */

import faker from 'faker';
import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('organizations', {});
}

function up(queryInterface: QueryInterface): Promise<number | object> {
  return queryInterface.bulkInsert('organizations', [
    {
      name: faker.company.companyName(),
    },
  ]);
}

export { down, up };
