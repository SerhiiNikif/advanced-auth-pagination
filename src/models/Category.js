import mongoose from "mongoose";
const {Schema, model} = mongoose;

const categorySchema = new Schema({
    title: {type: String, required: true}
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
categorySchema.post('save', handleErrors);

const Category = model("Category", categorySchema);

export {
    Category
}