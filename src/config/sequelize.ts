import { Sequelize } from 'sequelize';
import config from '.';

const {
  postgres: { database, dialect, host, password, port, username },
} = config;

const migrationStorageTableName = 'migrations';

const sequelize = new Sequelize({
  database,
  dialect,
  password,
  port,
  username,
  host,
});

export default sequelize;
export { database, dialect, host, migrationStorageTableName, password, port, username };
