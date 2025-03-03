const catchAsync = require('../utils/catchAsync');
const Comments = require('../models/commentModel');
const AppError = require('../utils/AppError');
exports.addComment = catchAsync(async (req, res, next) => {
    const newComments = new Comments(req.body);
    const savedNewComments = newComments.save();

    if (savedNewComments) {
        return res.status(200).json({
            status: 'success',
            message: 'Komentar je uspesno dodat, ceka se na odobrenje',
        });
    } else return next(new AppError('Komentar nije poslat, pokusajte ponovo', 404));
});

exports.getProductComments = catchAsync(async (req, res, next) => {
    const allComments = await Comments.find({ product_id: req.params.productID });

    if (!allComments.length) return next(new AppError('Nema komentara za ovaj proizvod', 401));

    return res.status(200).json({
        status: 'success',
        allComments,
    });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
    const allComments = await Comments.find();

    if (!allComments.length) return next(new AppError('nema nijednog komentara', 401));

    return res.status(200).json({
        status: 'success',
        allComments,
    });
});

exports.changeCommmentStatus = catchAsync(async (req, res, next) => {
    const comment = await Comments.findByIdAndUpdate(req.body.commentID, { status: req.body.status }, { new: true, runValidators: true });

    if (!comment) return next(new AppError('Ovakav komentar ne postoji', 404));

    return res.status(200).json({
        status: 'success',
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comments.deleteOne({ _id: req.params.commentID });

    if (!comment.acknowledged && !data.deletedCount === 1) return next(new AppError('Greska pri brisanju komentara', 401));

    return res.status(200).json({
        status: 'success',
        message: 'Komentar je uspesno obrisan',
    });
});
