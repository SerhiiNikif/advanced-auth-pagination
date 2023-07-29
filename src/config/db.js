import mongoose from "mongoose";
import { MONGO_URI } from './index.js';

const dbConnection = async () => {
    await mongoose
        .connect(MONGO_URI)
        .then(() => console.log('DataBase connected...'))
        .catch(err => console.log(err))
};

export {
    dbConnection
}
