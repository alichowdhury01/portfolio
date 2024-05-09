import express from 'express'; // Fast, unopinionated, minimalist web framework for Node.js
import config from 'config'; // Node.js configuration management
import connect from './utils/connect'; // Database connection utility
import logger from './utils/logger'; // Logging utility
import routes from './routes'; // Application routes
import deserializeUser from './middleware/deserializeUser'; // Middleware for user deserialization

/**
 * Constants and variables.
 */

const PORT = config.get<string>('port'); // Server port

/**
 * Create Express app.
 */

const app = express();

/**
 * Middleware setup.
 */

app.use(express.json()); // Middleware for parsing JSON requests
app.use(deserializeUser); // Custom middleware for deserializing user

/**
 * Start the server.
 */

app.listen(PORT, async () => {
  // Log server information
  logger.info(`Server is running at http://localhost:${PORT}`);

  // Connect to the database
  await connect();

  // Initialize application routes
  routes(app);
});