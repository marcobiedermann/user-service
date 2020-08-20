/* eslint-disable @typescript-eslint/ban-types */

import faker from 'faker';
import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('users', {});
}

function up(queryInterface: QueryInterface): Promise<number | object> {
  return queryInterface.bulkInsert('users', [
    {
      mail: faker.internet.email(),
      name: faker.name.findName(),
    },
  ]);
}

export { down, up };
