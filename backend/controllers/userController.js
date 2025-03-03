const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/Email');
const signToken = require('../utils/signToken');

//-----------------------
//----REGISTER-----------
//-----------------------

exports.register = catchAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    console.log(req.body, 'req.body');
    if (!user) {
        const newUser = new Users(req.body);
        const saveNewUSer = await newUser.save();
        await new Email({ email: saveNewUSer.email, username: saveNewUSer.username }, 'https://mern-avj0.onrender.com/').sendWelcome();

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
    const user = await Users.findOne({ email: req.body.email }).select('+password');

    if (!user) {
        return next(new AppError('Ovakav korisnik vec postoji, molimo vas registrujte se', 401));
    }

    //proveravamo password
    const isCorrectPassword = await user.isCorrectPassword(req.body.password, user.password);

    if (!isCorrectPassword) return next(new AppError('netacni kredencijali', 401));

    //izbacujemo password pre slanja na front
    const { password, _id, __v, ...userData } = user.toObject();
    const token = signToken(user._id);

    return res.status(200).json({
        status: 'success',
        user: userData,
        token,
    });
};
