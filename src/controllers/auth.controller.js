import {
    registration,
    login
} from "../services/auth.service.js";

const registrationController = async (req, res) => {
    const registrationService = await registration(
        req.body.username,
        req.body.password
    );
    res.status(201).json(registrationService);
};

const loginController = async (req, res) => {
    const loginService = await login(
        req.body.username,
        req.body.password
    );
    res.status(200).json(loginService);
}


export {
    registrationController,
    loginController
};