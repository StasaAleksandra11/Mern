const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
    title: {
        type: String,
        required: [true, 'product title is required'],
    },
    description: {
        type: String,
        required: [true, 'product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'product price is required'],
    },
    image: {
        type: String,
        required: [true, 'product image is required'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    allRating: {
        type: Array,
    },
});
const ProductModel = mongoose.model('product', productSchema);
module.exports = ProductModel;
