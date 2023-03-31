const mongoose = require('mongoose');

const topsSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: String,
    size: Number,
    color: String,
    category: String,
    id: Number
})


const topsModel = mongoose.model("top",topsSchema)

module.exports = topsModel