import {
    getProducts,
    addProduct,
    getProduct,
    deleteProduct,
    editProduct
} from "../services/product.service.js";

const getProductsController = async (req, res) => {
    const {attribute, sort, limit, page} = req.query;
    const getCategoriesService = await getProducts(attribute, sort, limit, page);
    res.status(200).json(getCategoriesService);
}

const addProductController = async (req, res) => {
    const addProductService = await addProduct(
        req.body.price,
        req.body.title,
        req.body.description,
        req.body.mainPhoto,
        req.body.photos,
        req.body.currency,
        req.body.categoryId
    );
    res.status(201).json(addProductService);
}

const getProductByIdController = async (req, res) => {
    const getCategoryByIdService = await getProduct(
        req.params.id
    );
    res.status(200).json(getCategoryByIdService);
}

const deleteProductController = async (req, res) => {
    const deleteCategoryService = await deleteProduct(
        req.params.id
    );
    res.status(200).json(deleteCategoryService);
}

const editProductController = async (req, res) => {
    const editCategoryService = await editProduct(
        req.params.id,
        req.body.price,
        req.body.title,
        req.body.description,
        req.body.mainPhoto,
        req.body.photos,
        req.body.currency,
        req.body.categoryId
    );
    res.status(200).json(editCategoryService);
}

export {
    getProductsController,
    addProductController,
    getProductByIdController,
    deleteProductController,
    editProductController
};