const mongoose = require('mongoose');

const jeansSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: String,
    size: Number,
    color: String,
    category: String,
    id: Number,
    quantity:Number
})


const jeansModel = mongoose.model("jean",jeansSchema)

module.exports = jeansModel