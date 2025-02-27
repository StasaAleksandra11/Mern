const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


//ucitaj mi staticke fajlove
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// * Routes




app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);
app.use('/api/payment', paymentRoutes);

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
