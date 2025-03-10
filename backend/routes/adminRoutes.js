const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/adminController');
const authorizationValidation = require('../utils/authorizationValidation');
const upload = multer({ dest: 'uploads/' });

router
    .route('/product/:productID?/:productImage?')
    .post(authorizationValidation.protect, upload.single('file'), adminController.addProduct)
    .delete(authorizationValidation.protect, adminController.deleteSingleProduct)
    .put(authorizationValidation.protect, upload.single('file'), adminController.editSingleProduct )

module.exports = router;
