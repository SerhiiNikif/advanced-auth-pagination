import express from "express";
import swaggerUi from 'swagger-ui-express';
// import YAML from 'yamljs';
import swaggerJsDoc from "swagger-jsdoc";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import apiErrorHandler from './middlewares/apiErrorHandler.js';
import { swaggerOptions } from './config/swaggerConfig.js';
import configureRoutes from './routes/configureRoutes.js';

const app = express();

// const swaggerDocument = YAML.load('./public/swagger.yml');
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const specs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.use(express.static("public"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl: CSS_URL } ));
app.get("/", (req, res) => {res.redirect("/api-docs")}); // this is for the vercel home page

configureRoutes(app);

app.use(apiErrorHandler);

export default app;