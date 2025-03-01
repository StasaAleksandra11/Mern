const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/').post(commentController.addComment);
router.route('/filter/:productID').get(commentController.getProductComments);

module.exports = router;
