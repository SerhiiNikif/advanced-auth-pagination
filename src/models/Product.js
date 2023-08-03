import mongoose from "mongoose";
const {Schema, model} = mongoose;

const productSchema = new Schema({
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    mainPhoto: {type: String, required: true},
    photos: [String],
    currency: {type: String, required: true},
    createDate: {type: Date, default: Date.now},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'}
});

const Product = model("Product", productSchema);

export default Product;
