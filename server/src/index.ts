import express, { Application } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PORT } from './config.js';
import router from './routes.js';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

const app: Application = express();

app.use('/', router);

app.listen(PORT, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:8888');
  });

export { app };