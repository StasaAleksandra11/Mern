const AppError = require("./AppError");

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.log(err, 'catchAsync error');
            


            // MONGOOSE VALIDACIJA
            if(err.name === 'ValidationError'){
                const messages = Object.values(err.errors).map((el) => el.message);
                const message = messages.join('. ')
                return next(new AppError(message, 400))
            }
            //  STRIPE VALIDACIJA
            switch (err.type) {
                case 'StripeCardError':
                    return next(new AppError(err.message, 404))
                
                case 'StripeInvalidRequestError':
                  console.log('An invalid request occurred.');
                 
                default:
                  console.log('Another problem occurred, maybe unrelated to Stripe.');
                  break;
              }




            return next(new AppError('Greska na serveru', 500))
        })
    }
}