const mongoose = require('mongoose');

const Users = mongoose.model('users', {
    username: String,
    password: String
});

module.exports = Users;