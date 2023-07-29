import jwt from 'jsonwebtoken';

const generateAccessToken = id => {
    const payload = {id};

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

export default generateAccessToken;