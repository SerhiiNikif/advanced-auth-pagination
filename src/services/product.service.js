import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import createError from "../helpers/errors/createError.js";

const getProducts = async (attribute, sort, limit, page) => {
    const dto = { _id: 1, price: 1, title: 1, mainPhoto: 1, createDate: 1 };
    let result = pagination(attribute, sort, limit, page, dto);

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

const pagination = async (attribute, sort, limit=10, page, dto) => {
    const docLimit = +limit;
    const pageNumber = page ? page - 1 : 0;

    const arrForAggregate = [
        { $project: dto },
        { $skip: docLimit * pageNumber }, 
        { $limit: docLimit },
    ];

    if (typeof attribute !== 'undefined' && ['price', 'createDate'].includes(attribute.toLowerCase()) &&
        typeof sort !== 'undefined' && ['asc', 'desc'].includes(sort.toLowerCase())
    ) {
        // if attribute and sort are specified
        arrForAggregate.push({ $sort: {[attribute]: sort === 'desc' ? -1 : 1} });
    } else if (typeof attribute === 'undefined' && typeof sort === 'undefined') {
        // skip if attribute and sort are not specified
    } else {
        /*
            If the parameter 'attribute' was specified without 'sort', or vice versa, 
            or if these parameters were specified incorrectly
        */
        throw createError(422, "You specified the 'attribute' and 'sort' parameters incorrectly");
    }

    let result = await Product.aggregate(arrForAggregate);

    return result
}

export {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    editProduct
};
