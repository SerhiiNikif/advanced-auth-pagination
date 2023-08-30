import categoryService from '../services/category.service.js';

class CategoryController {
    async getCategories(req, res, next) {
        try {
            const {limit, page} = req.query;
            const getCategoriesService = await categoryService.getCategories(limit, page);
            res.status(200).json(getCategoriesService);
        } catch (e) {
            next(e);
        }
    }

    async addCategory(req, res, next) {
        try {
            const addCategoryService = await categoryService.addCategory(
                req.body.title
            );
            res.status(201).json(addCategoryService);
        } catch (e) {
            next(e);
        }
    }

    async getCategoryById(req, res, next) {
        try {
            const getCategoryByIdService = await categoryService.getCategoryById(
                req.params.id
            );
            res.status(200).json(getCategoryByIdService);
        } catch (e) {
            next(e);
        }
    }

    async getCategoryProducts (req, res) {
        try {
            const {currency} = req.query;
            const getCategoryProductsService = await categoryService.getCategoryProducts(
                req.params.id,
                currency
            );
            res.status(200).json(getCategoryProductsService);
        } catch (e) {
            next(e);
        }
    }

    async editCategory(req, res, next) {
        try {
            const editCategoryService = await categoryService.editCategory(
                req.params.id,
                req.body.title
            );
            res.status(200).json(editCategoryService);
        } catch (e) {
            next(e);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const deleteCategoryService = await categoryService.deleteCategory(
                req.params.id
            );
            res.status(200).json(deleteCategoryService);
        } catch (e) {
            next(e);
        }
    }
}

export default new CategoryController();
