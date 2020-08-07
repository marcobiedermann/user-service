import { Sequelize } from 'sequelize';
import config from '.';
import logger from '../utils/logger';

const {
  database: { url },
} = config;

const dialectOptions = {
  ssl: process.env.NODE_ENV === 'production',
};

const migrationStorageTableName = 'migrations';

function logging(message: string): void {
  logger.debug(message);
}

const sequelize = new Sequelize(url, {
  dialectOptions,
  logging,
});

export default sequelize;
export { dialectOptions, migrationStorageTableName, url };
