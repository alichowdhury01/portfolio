import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

/**
 * Connects to the MongoDB database using the provided URI from the configuration.
 * Logs a success message if the connection is established, otherwise logs an error
 * message and exits the process.
 */
async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
