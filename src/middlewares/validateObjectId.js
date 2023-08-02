import mongoose from "mongoose";
import ApiError from '../exceptions/api-error.js';

const {isValidObjectId} = mongoose;

export default function (req, res, next) {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return next(ApiError.BadRequest(`${id} is not valid id format`));
    }
    next();
}
