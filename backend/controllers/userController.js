const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/Email');

//-----------------------
//----REGISTER-----------
//-----------------------

exports.register = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    console.log(req.body, 'req.body');
    if (!user) {
        const newUser = new Users(req.body);
        const saveNewUSer = await newUser.save();
        await new Email(req.body, 'www.localhost.com').sendWelcome()
        console.log('poslat mail')
        return res.status(200).json({
            status: 'success',
            message: 'User uspesno registrovan',
        });
    } else {
        return next(new AppError('Ovakav korisnik vec postoji', 409));
    }
});

//-----------------
//-----LOGIN-------
//-----------------

exports.login = async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    console.log(user, 'user');

    if (!user) {
        return next(new AppError('Ovakav korisnik vec postoji, molimo vas registrujte se', 401));
    }
    if (user) {
        if (user.password === req.body.password) {
            return res.status(200).json({
                status: 'succes',
                message: 'Uspesno ste se logovali',
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'Netacni kredencijali',
            });
        }
    }
};
