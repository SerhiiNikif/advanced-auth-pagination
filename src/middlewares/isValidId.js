import mongoose from "mongoose";
import { createError } from "../helpers/index.js";

const {isValidObjectId} = mongoose;

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return next(createError(400, `${id} is not valid id format`))
    }
    next();
}

export default isValidId;