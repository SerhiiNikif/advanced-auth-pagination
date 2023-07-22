import { JWT_SECRET } from '../../config/index.js';
import jwt from 'jsonwebtoken';

const generateAccessToken = id => {
    const payload = {id};

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export default generateAccessToken;