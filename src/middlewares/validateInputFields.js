import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

export default function (validations) {
    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            next();
        }
    ];
};
