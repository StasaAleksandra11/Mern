const Products = require('../models/productModel');
const { path } = require('path');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const { log } = require('console');

exports.addProduct = catchAsync(async (req, res, next) => {
    const productData = JSON.parse(req.body.product);

    if (req.file) productData.image = req.file.filename;
    else return next(new AppError('slika proizvoda je obavezna', 404));

    const newProduct = new Products(productData);
    await newProduct.save();

    res.status(200).json({
        status: 'success',
        message: 'Uspesno dodat proizvod',
    });
});

exports.deleteSingleProduct = catchAsync(async (req, res, next) => {
    const data = await Products.deleteOne({ _id: req.params.productID });

    if (data.acknowledged && data.deletedCount === 1) {
        const imagePath = `${__dirname}/../uploads/${req.params.productImage}`;

        fs.unlink(imagePath, (err) => {
            if (err) return next(new AppError('Slika nije obrisana', 404));
        });

        return res.status(200).json({
            status: 'succcess',
            message: 'Proizvod uspesno obrisan',
        });
    } else next(new AppError('Ovakav proizvod ne postoji', 404));
});


  exports.editSingleProduct = catchAsync(async (req, res, next) => {
    
    const productData = req.body.product ? JSON.parse(req.body.product) : req.body;
    const product = await Products.findById(productData.id);
    if (!product) return next(new AppError('Ovakav proizvod ne postoji', 404));

    if (req.file) {
        if (product.image) {
            const oldImagePath = path.join(`${__dirname}/../uploads/${req.body.image}`);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        productData.image = req.file.filename;
    }

    const updatedProduct = await Products.findByIdAndUpdate(productData.id, productData, { new: true });
    console.log(updatedProduct, 'update Product');
    
    if (!updatedProduct) return next(new AppError('Došlo je do greške, pokušajte ponovo kasnije', 404));

    return res.status(200).json({
        status: 'success',
        message: 'Uspešno ažuriran proizvod',
    });
});


