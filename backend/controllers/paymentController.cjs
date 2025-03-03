const stripe = require('stripe');
const stripeSK = stripe(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.makePayment = catchAsync(async (req, res, next) => {
    if (!req.body.amount || !req.body.currency) return next(new AppError('suma i valuta su neophodni', 400));
    const paymentIntents = await stripeSK.paymentIntents.create({
        amount: req.body.amount,
        currency: req.body.currency,
        automatic_payment_methods: {
            enabled: true,
        },
    });


    res.status(200).json({
        status: 'success',
        secretKey: paymentIntents.client_secret,
    });
});
