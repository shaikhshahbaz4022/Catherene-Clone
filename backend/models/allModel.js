const mongoose = require('mongoose');

const AllSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    products: [
     
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "jean"
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shoe"
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "top"
        }
     
    ]


})
const AllModel = mongoose.model("all",AllSchema)
module.exports = AllModel

