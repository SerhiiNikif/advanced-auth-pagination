import express from "express";
import {
    getProductsController,
    addProductController,
    getProductByIdController,
    deleteProductController,
    editProductController
} from '../controllers/products-controller.js';

import validateObjectId from "../middlewares/validateObjectId.js";
import authMiddleware from '../middlewares/auth-middleware.js';
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getProductsController));
router.post('/', authMiddleware, ctrlWrapper(addProductController));
router.get('/:id', validateObjectId, ctrlWrapper(getProductByIdController));
router.delete('/:id', authMiddleware, validateObjectId, ctrlWrapper(deleteProductController));
router.put('/:id', authMiddleware, validateObjectId, ctrlWrapper(editProductController));

export default router;