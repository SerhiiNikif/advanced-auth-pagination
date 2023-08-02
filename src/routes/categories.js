import express from "express";
import {
    getCategoriesController,
    addCategoryController,
    getCategoryByIdController,
    getCategoryProductsController,
    deleteCategoryController,
    editCategoryController
} from '../controllers/categories-controller.js';

import {isValidId, isAuth} from "../middlewares/index.js";
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getCategoriesController));
router.post('/', isAuth, ctrlWrapper(addCategoryController));
router.get('/:id', isValidId, ctrlWrapper(getCategoryByIdController));
router.get("/:id/product", ctrlWrapper(getCategoryProductsController));
router.delete('/:id', isAuth, isValidId, ctrlWrapper(deleteCategoryController));
router.put('/:id', isAuth, isValidId, ctrlWrapper(editCategoryController));

export default router;