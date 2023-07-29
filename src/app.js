import 'dotenv/config';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import authRouter from './routes/auth.router.js';
import categoryRouter from "./routes/category.router.js";
import productRouter from "./routes/product.router.js";
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();

const swaggerDocument = YAML.load('./public/swagger.yml');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.use(errorMiddleware);

export default app;