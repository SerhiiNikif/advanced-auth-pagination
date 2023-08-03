import mongoose from "mongoose";

import CategoryModel from "../models/Category.js";
import { convertCurrencyFromURLParams, paginateData } from '../helpers/index.js';
import ApiError from '../exceptions/api-error.js';

class CategoryService {
    async getCategories(limit, page) {
        const arrForAggregate = [
            { $project: { _id: 1, title: 1, createDate: 1 } }
        ];
    
        paginateData(arrForAggregate, limit, page);
        const result = await CategoryModel.aggregate(arrForAggregate);
        return result
    }

    async addCategory(title) {
        await this.checkIfCategoryExists(title);
        category = new CategoryModel({title});
        const result = await category.save();
        return {id: result._id}
    }

    async getCategory(id) {
        const result = await CategoryModel.aggregate([
            { $match: {"_id": new mongoose.Types.ObjectId(id)} },
            { $project: { _id: 1, title: 1, createDate: 1 } }
        ]);
        if (!result) throw ApiError.NotFoundError()
        return result;
    }

    async getCategoryProducts (id, currency) {
        let result = await this.aggregateCategoryProducts(id);
    
        if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
            result[0].products = await convertCurrencyFromURLParams(result[0].products, currency);
        }
    
        if (!result) throw ApiError.NotFoundError()
        return result;
    }

    async deleteCategory(id) {
        let result = await CategoryModel.findByIdAndDelete(id);
        if (!result) throw ApiError.NotFoundError()
        return {id: result._id}
    }

    async editCategory(id, title) {
        const result = await CategoryModel.findByIdAndUpdate(id, {title}, {new: true});
        if (!result) throw ApiError.NotFoundError()
        return result
    }

    async checkIfCategoryExists(title) {
        const category = await CategoryModel.findOne({ title });
        if (category) {
            throw ApiError.BadRequest(`Category ${title} already exists`);
        }
    }

    async aggregateCategoryProducts(id) {
        return await CategoryModel.aggregate([
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
    }
}

export default new CategoryService();
