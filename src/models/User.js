import mongoose from "mongoose";
const {Schema, model} = mongoose;
import bcrypt from 'bcryptjs';
import { BCRYPT_SALT } from '../config/index.js';

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createDate: {type: Date, default: Date.now}
});

const handleErrors = (error, data, next)=> {
    const {name, code} = error;
    
    if(name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
        error.message = "missing required name field";
    }
    next()
}

//@ts-ignores
userSchema.post('save', handleErrors);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, BCRYPT_SALT);
    this.password = hash;
    next();
});

const User = model('User', userSchema);

export {
    User
};