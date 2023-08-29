import express from "express";
import { body } from 'express-validator';

const router = express.Router();

import productController from '../controllers/products-controller.js';
import { validateObjectId, accessTokenValidator, validateInputFields, ctrlWrapper } from '../middlewares/index.js';

const productValidations = [
    body('price').isNumeric(),
    body('title').isLength({ min: 3, max: 100 }).isString(),
    body('description').isLength({ min: 3, max: 255 }).isString(),
    body('mainPhoto').isURL(),
    body('photos').isArray(),
    body('currency').isLength({ min: 3, max: 3 }).isString()
];

router.get('/', ctrlWrapper(productController.getProducts));
router.post('/', validateInputFields(productValidations), accessTokenValidator, ctrlWrapper(productController.addProduct));
router.get('/:id', validateObjectId, ctrlWrapper(productController.getProductById));
router.delete('/:id', accessTokenValidator, validateObjectId, ctrlWrapper(productController.deleteProduct));
router.put('/:id', validateInputFields(productValidations), accessTokenValidator, validateObjectId, ctrlWrapper(productController.editProduct));

export default router;