import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import createError from '../helpers/errors/createError.js';

const isAuth = (req, res, next) => { 
    if (req.method === 'OPTIONS') {
        next()
    }
 
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) throw createError(401)
  
        next();
    } catch (error) {
        console.log(error.message);

        throw createError(401)
    }
}

export default isAuth;
