const mongoose = require('mongoose');

const shoesSchema = mongoose.Schema({
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


const shoesModel = mongoose.model("shoe",shoesSchema)

module.exports = shoesModel