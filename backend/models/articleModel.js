const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String, 
    source: String,
    userReviewCount: { type: Number, default: 0 },
    userTrueCount: { type: Number, default: 0 },
    isTrue: Boolean,
    closed: { type: Boolean, default: false },
});

const User = mongoose.model('Article', articleSchema);

module.exports = User;