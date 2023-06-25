const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role : {
        type : String,
        enum : ["Admin","User"],
        default : "User"
    },
    image:String

}, {
    versionKey: false
})

const UserModel = mongoose.model("user", userShema)
module.exports = UserModel