import mongoose from "mongoose";

const dbConnection = async () => {
    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('DataBase connected...'))
        .catch(err => console.log(err))
};

export {
    dbConnection
}
