const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentModel = new Schema({
    author: { type: String, require: true },
    date: { type:Date, default: Date.now },
    comment: { type: String, require: true },
    status: { type: Boolean, default: false },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products', require: true },
    product_title: { type: String, require: true },
});

const CommentModel = mongoose.model('comments', commentModel);
module.exports = CommentModel;
