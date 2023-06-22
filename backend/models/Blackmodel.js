const mongoose = require('mongoose');
const BlackSchema = mongoose.Schema({
    token : String,
})
const BlackModel = mongoose.model("black",BlackSchema)
module.exports = BlackModel