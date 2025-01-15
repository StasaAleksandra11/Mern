const Users = require('../models/userModel');
const AppError = require('../utils/AppError');

exports.register = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        console.log(req.body, 'req.body');
        

        if (!user) {
            const newUser = new Users(req.body);

            try {
                const saveNewUSer = await newUser.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'User uspesno registrovan',
                });
            } catch (err) {
                return next(new AppError('Nije sacuvan user u bazi', 500));
            }
        } else {
            return next(new AppError('Ovakav korisnik vec postoji', 409));
        }
    } catch (err) {
        return next(new AppError('Greska je na serveru', 500));
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        console.log(user, 'user');
        
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
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'Ovakav korisnik ne postoji',
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Greska na serveru',
        });
    }
};
