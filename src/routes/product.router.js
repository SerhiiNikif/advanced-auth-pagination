import express from "express";
import {
    getProductsController,
    addProductController,
    getProductByIdController,
    deleteProductController,
    editProductController
} from '../controllers/product.controller.js';

import {isValidId} from "../middlewares/index.js";
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getProductsController));
router.post('/', ctrlWrapper(addProductController));
router.get('/:id', isValidId, ctrlWrapper(getProductByIdController));
router.delete('/:id', isValidId, ctrlWrapper(deleteProductController));
router.put('/:id', isValidId, ctrlWrapper(editProductController));

export default router;