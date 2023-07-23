import { createError } from "../helpers/index.js";

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
