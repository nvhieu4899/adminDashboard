var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "no_id"
    },
    email: {
        type: String,
        default: "a@gmail.com"
    },
    password: {
        type: String,
        default: "0"
    },
    authen: {
        type: String,
        default: "0"
    }
});
const model = mongoose.model('users', UsersSchema, 'users');
module.exports.model = model;