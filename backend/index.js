const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');

const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');
const Email = require('./utils/Email');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * Routes

app.use('/api/user', userRoutes);

// app.post('/api/email', (req, res, next)=> {
//     const user = req.body
//     console.log(user, 'user');
    
//     const url = 'www.localhost.com'
//     new Email(user, url).sendWelcome()
//     res.send('poslat email')
// })

// * 404 error

app.all('*', (req, res, next) => {
    return next(new AppError(`Ova stranica ${req.originalUrl} ne postoji`, 404));
});

// * Global error handler middleware

app.use(errorController);

module.exports = app;
