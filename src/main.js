import express from 'express';
import cors from 'cors';

import { fileUploadConfig } from './config/fileUpload.config.js';
import authRouter from './routes/auth.routes.js';
import libroRouter from './routes/libro.routes.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { serverInit } from './services/ServerInit.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(fileUploadConfig);
app.use(express.static('public'));

//Agregar configuraciones y middlewares para rutas
app.use('/api/v1', authRouter);
app.use('/api/v1', libroRouter);

app.use(errorHandler);

serverInit(app);