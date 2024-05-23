import express from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import cors from 'cors';
import config from 'config';

function createServer() {
  const allowedOrigins = ['https://www.alichowdhury.ca'];

  const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  };

  const app = express();
  
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(deserializeUser);
  routes(app);
  return app;
}

export default createServer;
