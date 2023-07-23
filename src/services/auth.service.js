import bcrypt from 'bcryptjs';

import { User } from "../models/User.js";
import { 
    generateAccessToken, 
    createError 
} from "../helpers/index.js";

const registration = async (username, password) => {
    let user = await User.findOne({ username });

    if (user) {
        throw createError(400, `User ${username} already exists`);
    }
    
    user = new User({username, password});

    const token = generateAccessToken(user._id);
  
    if (token) {
        await user.save();

        return {
            _id: user._id,
            username: user.username,
            password: user.password,
            token: token
        }
    } else {
         throw createError(400, 'Token error');
    }
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw createError(404, `User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        throw createError(400, 'Wrong password entered');
    }

    const token = generateAccessToken(user._id);
  
    if (token) {
        return { token: token }
    } else {
        throw createError(400, 'Token error');
    }  
}

export {
    registration,
    login
};
