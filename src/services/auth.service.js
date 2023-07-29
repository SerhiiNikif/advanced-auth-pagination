import bcrypt from 'bcryptjs';

import { User } from "../models/User.js";
import { generateAccessToken } from "../helpers/index.js";
import ApiError from '../exceptions/api-error.js';

const registration = async (username, password) => {
    let user = await User.findOne({ username });

    if (user) {
        throw ApiError.BadRequest(`User ${username} already exists`);
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
        throw ApiError.BadRequest('Token error');
    }
};

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw ApiError.BadRequest(`User ${username} not found`);
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        throw ApiError.BadRequest('Wrong password entered')
    }

    const token = generateAccessToken(user._id);
  
    if (token) {
        return { token: token }
    } else {
        throw ApiError.BadRequest('Token error');
    }  
}

export {
    registration,
    login
};
