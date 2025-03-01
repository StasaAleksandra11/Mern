const catchAsync = require("../utils/catchAsync");
const Comments = require('../models/commentModel');
const AppError = require("../utils/AppError");
exports.addComment = catchAsync(async(req, res, next) => {
    console.log(req.body, 'req.body');
   const newComments = new Comments(req.body)
   const savedNewComments = newComments.save()

   if(savedNewComments) {
    return res.status(200).json({
        status: 'success',
        message: 'Komentar je uspesno dodat, ceka se na odobrenje'
    })
   } else return next(new AppError('Komentar nije poslat, pokusajte ponovo', 404))
   
    
    
})


exports.getProductComments = catchAsync(async (req, res, next) => {
console.log(req.params.productID, 'req.params');
const allComments = await Comments.find({product_id: req.params.productID })
console.log(allComments, 'all coments');

 if(!allComments.length) return next(new AppError('Nema komentara za ovaj proizvod', 401))

  return res.status(200).json({
    status: 'success',
    allComments
  })


})