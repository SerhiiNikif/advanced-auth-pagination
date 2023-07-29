import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { 
    paginationData, 
    sortByURLParams, 
    convertCurrencyFromURLParams
} from '../helpers/index.js';
import ApiError from '../exceptions/api-error.js';

const getProducts = async (attribute, sort, limit, page, currency) => {
    const arrForAggregate = [
        { $project: { _id: 1, price: 1, title: 1, mainPhoto: 1, createDate: 1 } }
    ];

    await paginationData(arrForAggregate, limit, page);

    await sortByURLParams(arrForAggregate, attribute, sort);

    let result = await Product.aggregate(arrForAggregate);

    if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
        result = await convertCurrencyFromURLParams(result, currency)
    }
    
    return result
}

const addProduct = async (price, title, description, mainPhoto, photos, currency, categoryId) => {
    let product = await Product.findOne({ title });

    if (product) {
        throw ApiError.BadRequest(`Product ${title} already exists`);
    }

    product = new Product({price, title, description, mainPhoto, photos, currency, categoryId});

    const result = await product.save();

    return {id: result._id}
}

const getProduct = async (id, currency) => {
    let result = await Product.aggregate([
        { $match: {"_id": new mongoose.Types.ObjectId(id)} },
        { $project: { _id: 1, price: 1, title: 1, description: 1, mainPhoto: 1, photos: 1, createDate: 1 } },
    ]);

    if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
        result = await convertCurrencyFromURLParams(result, currency)
    }
    
    if (!result) throw ApiError.NotFoundError()

    return result;
}

const deleteProduct = async id => {
    let result = await Product.findByIdAndDelete(id);

    if (!result) throw ApiError.NotFoundError()

    return {message: "product deleted"}
}

const editProduct = async (id, price, title,  description, mainPhoto, photos, currency, categoryId) => {
    const result = await Product.findByIdAndUpdate(
        id, 
        {price, title,  description, mainPhoto, photos, currency, categoryId}, 
        {new: true});

    if (!result) throw ApiError.NotFoundError()

    return result
}

export {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    editProduct
};
