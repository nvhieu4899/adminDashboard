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

module.exports.model = mongoose.model('users', UsersSchema, 'users');
var model = mongoose.model('users', UsersSchema, 'users');

module.exports.getAllUser = async() => {
    return await model.find({});
}

module.exports.setAuthen = async(userid, value) => {
    try {
        await model.updateOne(
            {"_id" : userid},
            {"$set": {"authen": value-1}},
            function(err) {
                if (err) throw err;
            }
        )
        return true;
    } catch (err) {
        return false;
    }
    
}