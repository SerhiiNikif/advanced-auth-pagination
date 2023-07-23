import mongoose from "mongoose";
import { Category } from "../models/Category.js";
import { 
    paginationData,
    createError,
    convertCurrencyFromURLParams
} from '../helpers/index.js';

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
    getCategoryProducts,
    deleteCategory,
    editCategory
};
