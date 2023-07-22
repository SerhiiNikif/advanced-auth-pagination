import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import createError from "../helpers/errors/createError.js";

const getProducts = async (limit=10, page, sort) => {
    if (
        isNaN(limit) || 
        (page && isNaN(page)) || 
        sort && !['asc', 'desc'].includes(sort.toLowerCase())
    ) throw createError(422, "Invalid query parameter");

    const no_of_docs_each_page = +limit;
    const current_page_number = page ? page - 1 : 0;
    const sort_val = sort === 'desc' ? -1 : 1;

    const result = await Product.aggregate([
        { $project: { _id: 1, price: 1, title: 1, mainPhoto: 1, createDate: 1 } },
        { $skip: no_of_docs_each_page * current_page_number }, 
        { $limit: no_of_docs_each_page },
        { $sort: {'price': sort_val } }
    ]);

    return result
}

const addProduct = async (price, title, description, mainPhoto, photos, currency, categoryId) => {
    let product = await Product.findOne({ title });

    if (product) {
        throw createError(400, `Product ${title} already exists`);
    }

    product = new Product({price, title, description, mainPhoto, photos, currency, categoryId});

    const result = await product.save();

    return {id: result._id}
}

const getProduct = async id => {
    const result = await Product.aggregate([
        { $match: {"_id": new mongoose.Types.ObjectId(id)} },
        { $project: { _id: 1, price: 1, title: 1, description: 1, mainPhoto: 1, photos: 1, createDate: 1 } },
    ]);
    
    if (!result) throw createError(404);

    return result;
}

const deleteProduct = async id => {
    let result = await Product.findByIdAndDelete(id);

    if (!result) throw createError(404);

    return {message: "product deleted"}
}

const editProduct = async (id, price, title,  description, mainPhoto, photos, currency, categoryId) => {
    const result = await Product.findByIdAndUpdate(
        id, 
        {price, title,  description, mainPhoto, photos, currency, categoryId}, 
        {new: true});

    if (!result) throw createError(404);

    return result
}

export {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    editProduct
};
