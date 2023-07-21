import {
    getCategories,
    addCategory,
    getCategory,
    deleteCategory,
    editCategory
} from "../services/category.service.js";

const getCategoriesController = async (req, res) => {
    const {limit, page} = req.query;
    const getCategoriesService = await getCategories(limit, page);
    res.status(200).json(getCategoriesService);
}

const addCategoryController = async (req, res) => {
    const addCategoryService = await addCategory(
        req.body.title
    );
    res.status(201).json(addCategoryService);
}

const getCategoryByIdController = async (req, res) => {
    const getCategoryByIdService = await getCategory(
        req.params.id
    );
    res.status(200).json(getCategoryByIdService);
}

const deleteCategoryController = async (req, res) => {
    const deleteCategoryService = await deleteCategory(
        req.params.id
    );
    res.status(200).json(deleteCategoryService);
}

const editCategoryController = async (req, res) => {
    const editCategoryService = await editCategory(
        req.params.id,
        req.body
    );
    res.status(200).json(editCategoryService);
}

export {
    getCategoriesController,
    addCategoryController,
    getCategoryByIdController,
    deleteCategoryController,
    editCategoryController
};