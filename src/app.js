import 'dotenv/config';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiErrorHandler from './middlewares/apiErrorHandler.js';
import configureRoutes from './routes/configureRoutes.js';

const app = express();

const swaggerDocument = YAML.load('./public/swagger.yml');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static("public"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

configureRoutes(app);

app.use(apiErrorHandler);

export default app;