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

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - price
 *         - title
 *         - description
 *         - mainPhoto
 *         - currency
 *         - categoryId
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of a product
 *           example: 6414218570da02fed5d5eb6b
 *         price:
 *           type: number
 *           description: price of product
 *           example: 10000
 *         title:
 *           type: string
 *           description: title of product
 *           example: Galaxy S8 Plus
 *         description:
 *           type: string
 *           descripton: description of product
 *           example: Compact phablet with a huge 6.2-inch screen that has a 3K resolution.
 *         mainPhoto:
 *           type: string
 *           descripton: mainPhoto of product
 *           example: https://techx.myanmarlinks.net/media/486/conversions/feature_image.jpg
 *         photos:
 *           type: array
 *           descripton: array of product photos
 *           example: ['https://techx.myanmarlinks.net/media/486/conversions/feature_image.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGrONQgU164F4hcHS0zIjK0fk81gJcyIk-ofdSSR0PaNwqp00M9NfOKwG1huE4bWe0SE&usqp=CAU']
 *         currency:
 *           type: string
 *           descripton: currency of the product price
 *           enum:
 *             - USD
 *             - EUR
 *         categoryId:
 *           type: string
 *           descripton: id of the category to which the product belongs
 *           example: 6414218570da02fed5d5eb6b
 *         createDate:
 *           type: date
 *           descripton: date of creation of the product
 *           example: 2023-03-17T08:15:16.068+00:00
 *           format: 2023-03-17T08:15:16.068+00:00
 * 
 *     Error422:
 *       type: object
 *       required::
 *         - code
 *         - name
 *       properties:
 *         code:
 *           type: integer
 *           example: 422
 *         message:
 *           type: string
 *           example: You specified the 'attribute' and 'sort' parameters incorrectly
 */

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: products of categories
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     operationId: getProducts
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Limiting the number of results returned
 *         required: false
 *         type: number
 *         default: 10
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         type: number
 *         default: 1
 *       - name: currency
 *         in: query
 *         description: The symbol code of the currency to which the prices of the products must be converted
 *         required: false
 *         type: string
 *       - name: attribute
 *         in: query
 *         description: The attribute to sort by
 *         required: false
 *         type: string
 *       - name: sort
 *         in: query
 *         description: Sort direction (asc, desc)
 *         required: false
 *         type: string
 * 
 *         allOf:
 *           - $ref: "#/parameters/attribute"
 *           - $ref: "#/parameters/sort"
 *     security: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       422:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error422'
 */

router.get('/', ctrlWrapper(productController.getProducts));


router.post('/', validateInputFields(productValidations), accessTokenValidator, ctrlWrapper(productController.addProduct));
router.get('/:id', validateObjectId, ctrlWrapper(productController.getProductById));
router.delete('/:id', accessTokenValidator, validateObjectId, ctrlWrapper(productController.deleteProduct));
router.put('/:id', validateInputFields(productValidations), accessTokenValidator, validateObjectId, ctrlWrapper(productController.editProduct));

export default router;