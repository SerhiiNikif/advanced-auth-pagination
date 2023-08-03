import express from "express";
import {body} from 'express-validator';

const router = express.Router();

import categoriesController from '../controllers/categories-controller.js';
import { validateObjectId, accessTokenValidator, validateInputFields, ctrlWrapper } from '../middlewares/index.js';

const categoryValidations = [
    body('title').isLength({ min: 3, max: 100 }).isString()
];

router.get('/', ctrlWrapper(categoriesController.getCategories));
router.post('/', validateInputFields(categoryValidations), accessTokenValidator, ctrlWrapper(categoriesController.addCategory));
router.get('/:id', validateObjectId, ctrlWrapper(categoriesController.getCategoryById));
router.get("/:id/product", ctrlWrapper(categoriesController.getCategoryProducts));
router.delete('/:id', accessTokenValidator, validateObjectId, ctrlWrapper(categoriesController.deleteCategory));
router.put('/:id', validateInputFields(categoryValidations), accessTokenValidator, validateObjectId, ctrlWrapper(categoriesController.editCategory));

export default router;