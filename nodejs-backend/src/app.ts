import express from 'express'; // Fast, unopinionated, minimalist web framework for Node.js
import config from 'config'; // Node.js configuration management
import connect from './utils/connect'; // Database connection utility
import logger from './utils/logger'; // Logging utility
import routes from './routes'; // Application routes
import deserializeUser from './middleware/deserializeUser'; // Middleware for user deserialization
import createServer from './utils/server';
/**
 * Constants and variables.
 */

const PORT = config.get<string>('port'); // Server port


const app = createServer();

app.listen(1337, async () => {
  // Log server information

 
  try {
    // Connect to the database
    await connect();
    logger.info(`Server is running at http://localhost:${PORT}`);

  } catch (error: any) {
    // Log an error if the database connection fails
    logger.error('Could not connect to db: ', error);
    process.exit(1);
    
  }

});