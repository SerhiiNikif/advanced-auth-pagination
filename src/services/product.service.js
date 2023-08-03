import mongoose from "mongoose";

import ProductModel from "../models/Product.js";
import { convertCurrencyFromURLParams, paginateData, sortByURLParams } from '../helpers/index.js';
import ApiError from '../exceptions/api-error.js';

class ProductService {
    async getProducts(attribute, sort, limit, page, currency) {
        const arrForAggregate = [
            { $project: { _id: 1, price: 1, title: 1, mainPhoto: 1, createDate: 1 } }
        ];
    
        await paginateData(arrForAggregate, limit, page);
        await sortByURLParams(arrForAggregate, attribute, sort);
    
        let result = await ProductModel.aggregate(arrForAggregate);
        if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
            result = await convertCurrencyFromURLParams(result, currency)
        }
        
        return result
    }

    async addProduct (price, title, description, mainPhoto, photos, currency, categoryId) {
        await this.checkIfProductExists(title);
        const product = new ProductModel({price, title, description, mainPhoto, photos, currency, categoryId});
        const result = await product.save();
        return {id: result._id}
    }

    async getProductById (id, currency) {
        let result = await this.aggregateProductById(id);
        if (typeof currency !== 'undefined' && ['usd', 'eur'].includes(currency.toLowerCase())) {
            result = await convertCurrencyFromURLParams(result, currency)
        }
        
        if (!result) throw ApiError.NotFoundError()
        return result;
    }

    async deleteProduct(id) {
        let result = await ProductModel.findByIdAndDelete(id);
        if (!result) throw ApiError.NotFoundError()
        return {id: result._id}
    }

    async editProduct (id, price, title,  description, mainPhoto, photos, currency, categoryId) {
        const result = await ProductModel.findByIdAndUpdate(
            id, 
            {price, title,  description, mainPhoto, photos, currency, categoryId}, 
            {new: true});
    
        if (!result) throw ApiError.NotFoundError()
        return result
    }

    async checkIfProductExists(title) {
        const product = await ProductModel.findOne({ title });
        if (product) {
            throw ApiError.BadRequest(`Product ${title} already exists`);
        }
    }

    async aggregateProductById(id) {
        return await ProductModel.aggregate([
            { $match: { "_id": new mongoose.Types.ObjectId(id) } },
            { $project: { _id: 1, price: 1, title: 1, description: 1, mainPhoto: 1, photos: 1, createDate: 1 } },
        ]);
    }
}

export default new ProductService();
