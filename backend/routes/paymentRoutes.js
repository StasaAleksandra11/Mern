const express = require ('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController.cjs')

router.route('/').post(paymentController.makePayment )

module.exports = router;