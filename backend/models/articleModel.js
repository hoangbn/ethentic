const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    userReviewCount: Number
});

const User = mongoose.model('Article', articleSchema);

module.exports = User;