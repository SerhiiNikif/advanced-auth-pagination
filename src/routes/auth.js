import express from 'express';
import {body} from 'express-validator';

const router = express.Router();

import authController from '../controllers/auth-controller.js';
import { ctrlWrapper, validateInputFields } from '../middlewares/index.js';

const authValidations = [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}).isString()
];

router.post('/registration', validateInputFields(authValidations), ctrlWrapper(authController.registration));
router.post('/login', ctrlWrapper(authController.login));
router.post('/logout', ctrlWrapper(authController.logout));
router.get('/activate/:link', ctrlWrapper(authController.activate));
router.get('/refresh', ctrlWrapper(authController.refresh));

export default router
