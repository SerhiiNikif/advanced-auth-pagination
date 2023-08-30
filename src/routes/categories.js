import express from "express";
import {body} from 'express-validator';

const router = express.Router();

import categoriesController from '../controllers/categories-controller.js';
import { validateObjectId, accessTokenValidator, validateInputFields, ctrlWrapper } from '../middlewares/index.js';

const categoryValidations = [
    body('title').isLength({ min: 3, max: 100 }).isString()
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of a category
 *           example: 6414218570da02fed5d5eb6b
 *         title:
 *           type: string
 *           description: title of category
 *           example: Samsung
 *         createDate:
 *           type: date
 *           descripton: date of creation of the category
 *           example: 2023-03-17T08:15:16.068+00:00
 *           format: 2023-03-17T08:15:16.068+00:00
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error400:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Bad Request
 *     Error401:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: integer
 *           example: 401
 *         message:
 *           type: string
 *           example: Unauthorized
 *     Error404:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: integer
 *           example: 404
 *         message:
 *           type: string
 *           example: Not found
 *     Error500:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: integer
 *           example: 500
 *         message:
 *           type: string
 *           example: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   headers:
 *     Api-Token:
 *       schema:
 *         type: string
 *         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTQyMTg1NzBkYTAyZmVkNWQ1ZWI2YiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3OTEzNzk3OSwiZXhwIjoxNjc5MjI0Mzc5fQ.Kk03XBKPF9rbhW8fui2qV9oo0M8FAyPMsWCy5U3l4do"
 */

/**
 * @swagger
 *  tags:
 *    name: Categories
 *    description: product categories
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     operationId: getCategories
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.get('/', ctrlWrapper(categoriesController.getCategories));

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a category
 *     tags: [Categories]
 *     operationId: addCategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: Samsung
 *     responses:
 *       201:
 *         description: Successful response with created category
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64ef1e0602bc830d84b154a9
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Category Samsung already exists
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error401'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.post('/', validateInputFields(categoryValidations), accessTokenValidator, ctrlWrapper(categoriesController.addCategory));

/**
 * @swagger
 * /category/{category_id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     operationId: getCategory
 *     parameters:
 *       - name: category_id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 6414218570da02fed5d5eb6b
 *     responses:
 *       200:
 *         description: Successful response with one category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 64eca6e207abe0b8edb376a8d is not valid id format
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.get('/:id', validateObjectId, ctrlWrapper(categoriesController.getCategoryById));

/**
 * @swagger
 * /category/{category_id}/product:
 *   get:
 *     summary: Get products by category ID
 *     tags: [Categories]
 *     operationId: getCategoryProducts
 *     parameters:
 *       - name: category_id
 *         in: path
 *         description: Category ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 6414218570da02fed5d5eb6b
 *       - name: currency
 *         in: query
 *         description: The symbol code of the currency to which the prices of the products must be converted
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Returns all products of the given category and the category itself
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The Auto-generated id of a product
 *                           example: 6414218570da02fed5d5eb6b
 *                         price:
 *                           type: number
 *                           description: price of product
 *                           example: 10000
 *                         title:
 *                           type: string
 *                           description: title of product
 *                           example: Galaxy S8 Plus
 *                         mainPhoto:
 *                           type: string
 *                           description: mainPhoto of product
 *                           example: https://techx.myanmarlinks.net/media/486/conversions/feature_image.jpg
 *                         createDate:
 *                           type: date
 *                           description: date of creation of the product
 *                           example: 2023-03-17T08:15:16.068+00:00
 *                           format: 2023-03-17T08:15:16.068+00:00
 *                   _id:
 *                     type: string
 *                     example: 64ef42d5f0fa7e19ce353f80
 *                   title:
 *                     type: string
 *                     example: Sumsung
 *                   createDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-08-30T13:23:33.629Z"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 *       500:
 *         description: If we enter the wrong ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error500'
 */

router.get("/:id/product", ctrlWrapper(categoriesController.getCategoryProducts));

/**
 * @swagger
 * /category/{category_id}:
 *   put:
 *     summary: Edit category by ID
 *     tags: [Categories]
 *     operationId: editCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category_id
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *         example: 6414218570da02fed5d5eb6b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *                 example: Sumsung
 *     responses:
 *       200:
 *         description: Successful response with one category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Category"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 64eca6e207abe0b8edb376a8d is not valid id format
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error401'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.put('/:id', validateInputFields(categoryValidations), accessTokenValidator, validateObjectId, ctrlWrapper(categoriesController.editCategory));

/**
 * @swagger
 * /category/{category_id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Categories]
 *     operationId: deleteCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: category_id
 *         in: path
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *         example: 6414218570da02fed5d5eb6b
 *     responses:
 *       200:
 *         description: Successful removal
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64ef1e0602bc830d84b154a9
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: 64eca6e207abe0b8edb376a8d is not valid id format
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error401'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.delete('/:id', accessTokenValidator, validateObjectId, ctrlWrapper(categoriesController.deleteCategory));

export default router;