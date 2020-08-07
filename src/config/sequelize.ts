import { Sequelize } from 'sequelize';
import config from '.';
import logger from '../utils/logger';

const {
  database: { url },
} = config;

const migrationStorageTableName = 'migrations';

function logging(message: string): void {
  logger.debug(message);
}

const sequelize = new Sequelize(url, {
  logging,
});

export default sequelize;
export { url, migrationStorageTableName };
