import app from './app';
import logger from './utils/logger';

const server = app.listen(app.get('port'), () => {
  logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});

export default server;
