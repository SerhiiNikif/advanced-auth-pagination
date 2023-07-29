import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { 
    paginationData,
    convertCurrencyFromURLParams
} from '../helpers/index.js';
import ApiError from '../exceptions/api-error.js';

const getCategories = async (limit, page) => {
    const arrForAggregate = [
        { $project: { _id: 1, title: 1, createDate: 1 } }
    ];

    paginationData(arrForAggregate, limit, page);

    const result = await Category.aggregate(arrForAggregate);

    return result
}

const addCategory = async title => {
    let category = await Category.findOne({ title });

    if (category) {
        throw ApiError.BadRequest(`Category ${title} already exists`);
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
    
    if (!result) throw ApiError.NotFoundError()

    return result;
}

const getCategoryProducts = async (id, currency) => {
    let result = await Category.aggregate([
        { $match: { "_id": new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "categoryId",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    title: "$title",
                    createDate: "$createDate"
                },
                products: {
                    $push: {
                        _id: "$productInfo._id",
                        price: "$productInfo.price",
                        title: "$productInfo.title",
                        mainPhoto: "$productInfo.mainPhoto",
                        createDate: "$productInfo.createDate"
                    }
                }
            }
        },
        {
            $project: {
                _id: "$_id._id",
                title: "$_id.title",
                createDate: "$_id.createDate",
                products: 1
            }
        }
    ]);

    if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
        result[0].products = await convertCurrencyFromURLParams(result[0].products, currency);
    }

    if (!result) throw ApiError.NotFoundError()

    return result;
}

const deleteCategory = async id => {
    let result = await Category.findByIdAndDelete(id);

    if (!result) throw ApiError.NotFoundError()

    return {id: result._id}
}

const editCategory = async (id, title) => {
    const result = await Category.findByIdAndUpdate(
        id, 
        {title}, 
        {new: true}
    );

    if (!result) throw ApiError.NotFoundError()

    return result
}

export {
    getCategories,
    addCategory,
    getCategory,
    getCategoryProducts,
    deleteCategory,
    editCategory
};
