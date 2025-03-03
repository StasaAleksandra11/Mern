const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/').post(commentController.addComment).get(commentController.getAllComments).patch(commentController.changeCommmentStatus)
router.route('/filter/:productID').get(commentController.getProductComments);
router.route('/filter/:commentID').delete(commentController.deleteComment)

module.exports = router;
