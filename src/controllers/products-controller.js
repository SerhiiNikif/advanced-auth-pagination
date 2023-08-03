import productService from '../services/product.service.js';

class ProductController {
    async getProducts(req, res, next) {
        try {
            const {attribute, sort, limit, page, currency} = req.query;
            const getCategoriesService = await productService.getProducts(attribute, sort, limit, page, currency);
            res.status(200).json(getCategoriesService);
        } catch (e) {
            next(e);
        }
    }

    async addProduct(req, res, next) {
        try {
            const addProductService = await productService.addProduct(
                req.body.price,
                req.body.title,
                req.body.description,
                req.body.mainPhoto,
                req.body.photos,
                req.body.currency,
                req.body.categoryId
            );
            res.status(201).json(addProductService);
        } catch (e) {
            next(e);
        }
    }

    async getProductById(req, res, next) {
        try {
            const getCategoryByIdService = await productService.getProductById(
                req.params.id,
                req.query.currency
            );
            res.status(200).json(getCategoryByIdService);
        } catch (e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const deleteProductService = await productService.deleteProduct(
                req.params.id
            );
            res.status(200).json(deleteProductService);
        } catch (e) {
            next(e);
        }
    }

    async editProduct(req, res, next) {
        try {
            const editProductService = await editProduct(
                req.params.id,
                req.body.price,
                req.body.title,
                req.body.description,
                req.body.mainPhoto,
                req.body.photos,
                req.body.currency,
                req.body.categoryId
            );
            res.status(200).json(editProductService);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();
