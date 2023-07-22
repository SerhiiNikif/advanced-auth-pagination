import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import createError from '../helpers/errors/createError.js';

const getCategories = async (limit=10, page) => {
    if (
        isNaN(limit) || 
        (page && isNaN(page))
    ) throw createError(422, "Invalid query parameter");

    const no_of_docs_each_page = +limit;
    const current_page_number = page && !isNaN(page) ? page - 1 : 0;

    const result = await Category.aggregate([
        { $project: { _id: 1, title: 1, createDate: 1 } },
        { $skip: no_of_docs_each_page * current_page_number }, 
        { $limit: no_of_docs_each_page }
    ]);

    return result
}

const addCategory = async title => {
    let category = await Category.findOne({ title });

    if (category) {
        throw createError(400, `Category ${title} already exists`);
    }

    category = new Category({title});

    const result = await category.save();

    return {id: result._id}
}

const getCategory = async id => {
    const result = await Category.aggregate([
        { $match: {"_id": new mongoose.Types.ObjectId(id)} },
        { $project: { _id: 1, title: 1, createDate: 1 } }
    ]);
    
    if (!result) throw createError(404);

    return result;
}

const deleteCategory = async id => {
    let result = await Category.findByIdAndDelete(id);

    if (!result) throw createError(404);

    return {message: "category deleted"}
}

const editCategory = async (id, title) => {
    const result = await Category.findByIdAndUpdate(
        id, 
        {title}, 
        {new: true}
    );

    if (!result) throw createError(404);

    return result
}

export {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    editCategory
};
