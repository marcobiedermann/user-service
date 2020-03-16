import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('User', {});
}

function up(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkInsert('User', [
    {
      mail: 'john.doe@mail.com',
      name: 'John Doe',
    },
  ]);
}

export { down, up };
