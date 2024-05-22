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
  const collectionName = config.get<string>('collectionName');
  console.log(collectionName)
  try {
    await mongoose.connect("mongodb+srv://alichowdhury:Mouri123!@bd1.gm4lics.mongodb.net/?retryWrites=true&w=majority&appName=bd1")

    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db: ', error);
    process.exit(1);
  }
}

export default connect;
