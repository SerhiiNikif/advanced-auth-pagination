import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;

export  {
    PORT,
    MONGO_URI
}