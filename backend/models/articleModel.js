const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    userReviewCount: { type: Number, default: 0 },
    truthPercentage: Number,
    closed: { type: Boolean, default: false },
});

const User = mongoose.model('Article', articleSchema);

module.exports = User;