const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: String,
    email: String,
    password: String,

}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userShema)
module.exports = UserModel