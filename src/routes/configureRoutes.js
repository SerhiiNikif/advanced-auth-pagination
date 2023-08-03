import authRouter from './auth.js';
import categoryRouter from './categories.js';
import productRouter from './products.js';

export default function configureRoutes(app) {
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
    app.use('/product', productRouter);
}