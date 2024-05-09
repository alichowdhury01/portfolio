import logger from 'pino'; // Importing Pino logger library
import dayjs from 'dayjs'; // Importing Day.js library for date formatting

// Creating a logger instance with pretty printing configuration
const log = logger({
  transport: {
    target: 'pino-pretty', // Using pino-pretty for pretty printing logs
  },
  base: {
    pid: false, // Disabling printing process ID in logs
  },
  timestamp: () => `,"time":"${dayjs().format()}"`, // Adding a timestamp to logs using Day.js
});

export default log; // Exporting the configured logger instance
