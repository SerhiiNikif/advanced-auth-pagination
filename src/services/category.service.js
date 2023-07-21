import { Category } from "../models/Category.js";
import createError from '../helpers/errors/createError.js';

const pagination = async (limit=2, page) => {
    const no_of_docs_each_page = +limit;
    const current_page_number = page ? page - 1 : 0;

    const result = await Category.aggregate([  
        { $skip : no_of_docs_each_page * current_page_number }, 
        { $limit : no_of_docs_each_page }
    ]);

    return result
}

const getCategories = async (limit, page) => {
    const result = pagination(limit, page);

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
    const result = await Category.findById(id);
    
    if (!result) throw createError(404);

    return result;
}

const deleteCategory = async id => {
    let result = await Category.findByIdAndDelete(id);

    if (!result) throw createError(404);

    return {message: "category deleted"}
}

const editCategory = async (id, body) => {
    const result = await Category.findByIdAndUpdate(id, body, { new: true });

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
