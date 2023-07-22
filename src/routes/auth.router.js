import express from "express";
import {
    registrationController,
    loginController
} from '../controllers/auth.controller.js';

import ctrlWrapper from '../helpers/errors/ctrlWrapper.js';
const router = express.Router();

router.post("/registration", ctrlWrapper(registrationController));
router.post('/login', ctrlWrapper(loginController));

export default router;