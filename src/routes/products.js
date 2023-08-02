import express from "express";
import {
    getProductsController,
    addProductController,
    getProductByIdController,
    deleteProductController,
    editProductController
} from '../controllers/products-controller.js';

import {isValidId, isAuth} from "../middlewares/index.js";
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getProductsController));
router.post('/', isAuth, ctrlWrapper(addProductController));
router.get('/:id', isValidId, ctrlWrapper(getProductByIdController));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteProductController));
router.put('/:id', isAuth, isValidId, ctrlWrapper(editProductController));

export default router;