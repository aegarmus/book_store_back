import express from 'express';
import cors from 'cors';
import { serverInit } from './services/ServerInit.js';

import { errorHandler } from './middlewares/errorHandlers.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Agregar configuraciones y middlewares para rutas

app.use(errorHandler);

serverInit(app);