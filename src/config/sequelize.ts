import { Sequelize } from 'sequelize';
import config from '.';
import logger from '../utils/logger';

const {
  postgres: { database, dialect, host, password, port, username },
} = config;

const migrationStorageTableName = 'migrations';

function logging(message: string): void {
  logger.debug(message);
}

const sequelize = new Sequelize({
  database,
  dialect,
  logging,
  password,
  port,
  username,
  host,
});

export default sequelize;
export { database, dialect, host, migrationStorageTableName, password, port, username };
