import express from "express";
import {
    getCategoriesController,
    addCategoryController,
    getCategoryByIdController,
    deleteCategoryController,
    editCategoryController
} from '../controllers/category.controller.js';

import {isValidId} from "../middlewares/index.js";
import ctrlWrapper from "../helpers/errors/ctrlWrapper.js";

const router = express.Router();

router.get('/', ctrlWrapper(getCategoriesController));
router.post('/', ctrlWrapper(addCategoryController));
router.get('/:id', isValidId, ctrlWrapper(getCategoryByIdController));
router.delete('/:id', isValidId, ctrlWrapper(deleteCategoryController));
router.put('/:id', isValidId, ctrlWrapper(editCategoryController));

export default router;