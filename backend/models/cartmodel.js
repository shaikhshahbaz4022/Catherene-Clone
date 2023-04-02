const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    title: String,
    image: String,
    description: String,
    price: String,
    size: String,
    color: String,
    category: String,
    id: Number,
    userID : String,
    quantity:Number
    
})


const CartModel = mongoose.model("cart",CartSchema)

module.exports = CartModel