const mongoose = require('mongoose');

const Posts = mongoose.model('posts', {
    title: String,
    body: String
});

module.exports = Posts;