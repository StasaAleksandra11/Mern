
const Product = require('../models/productModel')
const AppError = require('../utils/AppError')

exports.getAllProduct = async(req, res, next) => {
   const products = await Product.find()
   console.log(products,'products')
   if(products.length > 0 ){
       res.status(200).json({
         status: 'success',
         products,
         
      })
   }else{
      return next(new AppError('Nemate nijedan proizvod', 401))
   }
}