const Product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProduct = catchAsync(async (req, res, next) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.status(200).json({
            status: 'success',
            products,
        });
    } else {
        return next(new AppError('Nemate nijedan proizvod', 401));
    }
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.productID);
    if (product) {
        res.status(200).json({
            status: 'success',
            product,
        });
    } else {
        return next(new AppError('ovakav proizvod ne postoji', 404));
    }
});
