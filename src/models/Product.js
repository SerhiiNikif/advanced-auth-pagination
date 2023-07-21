import mongoose from "mongoose";
const {Schema, model} = mongoose;

const productSchema = new Schema({
    price: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    mainPhoto: {type: String, required: true},
    photos: {type: Array, required: true},
    currency: {type: String, required: true},
    categoryId: {type: Schema.Types.ObjectId, ref: 'Category'}
}, { timestamps: true} );

const handleErrors = (error, data, next)=> {
    const {name, code} = error;
    
    if(name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
        error.message = "missing required name field";
    }
    next()
}

//@ts-ignore
productSchema.post('save', handleErrors);

const Product = model("Product", productSchema);

export {
    Product
}