import express from 'express';
const router = express.Router();

import authController from '../controllers/auth-controller.js';

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

export default router
