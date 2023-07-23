import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT);
const JWT_SECRET = process.env.JWT_SECRET;
const PBANK_API_URL = process.env.PBANK_API_URL;

export  {
    PORT,
    MONGO_URI,
    BCRYPT_SALT,
    JWT_SECRET,
    PBANK_API_URL
}