import express from 'express';
import {body} from 'express-validator';

const router = express.Router();

import authController from '../controllers/auth-controller.js';
import { ctrlWrapper, validateInputFields } from '../middlewares/index.js';

const authValidations = [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}).isString()
];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The Auto-generated id of a product
 *           example: 6414218570da02fed5d5eb6b
 *         email:
 *           type: string
 *           description: email of user (mail must exist)
 *           example: nikiforenko.serhii@gmail.com
 *         password:
 *           type: string
 *           description: password of user
 *           example: admin
 *         isActivated:
 *           type: boolean
 *           description: whether a new user is activated via mail
 *           example: false
 *         activationLink:
 *           type: string
 *           description: the activation link that comes to the mail
 *           example: https://google.com
 */

/**
 * @swagger
 * components:
 *   schemas:
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
 */

/**
 * @swagger
 *  tags:
 *    name: Auth
 *    description: user authorization
 */

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     operationId: registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: nikiforenko.serhii@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
 *                   example: User already exists
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.post('/registration', validateInputFields(authValidations), ctrlWrapper(authController.registration));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Issues a JWT token
 *     tags: [Auth]
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 example: nikiforenko.serhii@gmail.com
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         headers:
 *           Api-Token:
 *             $ref: "#/components/headers/Api-Token"
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2lmb3JlbmtvLnNlcmhpaUBnbWFpbC5jb20iLCJpZCI6IjY0ZWNhNDczNzY2ZTljYTczY2U5N2Q3NCIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2OTMzOTEyMjUsImV4cCI6MTY5MzM5MzAyNX0.m7k91JnO777zoVi5cVSqwh9f3-0UlRsLPvvdM7Uufns
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2lmb3JlbmtvLnNlcmhpaUBnbWFpbC5jb20iLCJpZCI6IjY0ZWNhNDczNzY2ZTljYTczY2U5N2Q3NCIsImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2OTMzOTEyMjUsImV4cCI6MTY5NTk4MzIyNX0.vXU24_j5rxyXaSz13-ZKY9OwA9hPVXbn41RA7dJotj0
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: nikiforenko.serhii@gmail.com
 *                     id:
 *                       type: string
 *                       example: 64eca473766e9ca73ce97d74.serhii@gmail.com
 *                     isActivated:
 *                       type: boolean
 *                       example: true
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
 *                   example: User with this email was not found
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error404'
 */

router.post('/login', ctrlWrapper(authController.login));
router.post('/logout', ctrlWrapper(authController.logout));
router.get('/activate/:link', ctrlWrapper(authController.activate));
router.get('/refresh', ctrlWrapper(authController.refresh));

export default router
