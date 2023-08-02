import express from "express";
import {
    getCategoriesController,
    addCategoryController,
    getCategoryByIdController,
    getCategoryProductsController,
    deleteCategoryController,
    editCategoryController
} from '../controllers/categories-controller.js';

import validateObjectId from "../middlewares/validateObjectId.js";
import authMiddleware from '../middlewares/auth-middleware.js';
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getCategoriesController));
router.post('/', authMiddleware, ctrlWrapper(addCategoryController));
router.get('/:id', validateObjectId, ctrlWrapper(getCategoryByIdController));
router.get("/:id/product", ctrlWrapper(getCategoryProductsController));
router.delete('/:id', authMiddleware, validateObjectId, ctrlWrapper(deleteCategoryController));
router.put('/:id', authMiddleware, validateObjectId, ctrlWrapper(editCategoryController));

export default router;