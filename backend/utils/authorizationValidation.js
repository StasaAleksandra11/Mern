const catchAsync = require('../utils/catchAsync');
const AppError = require('./AppError');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
exports.protect = catchAsync(async (req, res, next) => {
    let token;
    let decoded;
   
    // * DA LI TOKEN POSTOJI

    if (req.headers.authorization) token = req.headers.authorization;
    if (!token) return next(new AppError('Niste ulogovani, prvo se ulogujte', 401));

    //  * VERIFIKUJEM DA LI JE TOKEN VALIDAN PREKO JWT_SECRET

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return next(new AppError('Netacan ili istekao token, ulogujte se ponovo', 404));
        } else decoded = data;
    });

    // DA LI POSTOJI KORISNIK SA OVIM TOKENOM

    const freshUser = await Users.findById(decoded.id);
    

     //  NA KRAJU CEMO DA ETUJEMO KORISNIKA I DA ASTAVIMO SLEDECI MIDDLEWARE
    
     req.user = freshUser;
    
     next();
});
