import { QueryInterface } from 'sequelize';

function down(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkDelete('Team', {});
}

function up(queryInterface: QueryInterface): Promise<object> {
  return queryInterface.bulkInsert('Team', [
    {
      name: 'Mobility Benefits Squad',
    },
  ]);
}

export { down, up };
