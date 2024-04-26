import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 1337;
const DBURI = process.env.DBURI;

export default {
  port: `${PORT}`,
  dbUri: `${DBURI}`,
  saltWorkFactor: 10,
};
