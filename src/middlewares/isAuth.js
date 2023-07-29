import ApiError from '../exceptions/api-error.js';

const isAuth = (req, res, next) => { 
    if (req.method === 'OPTIONS') {
        next()
    }
 
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
  
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}

export default isAuth;
