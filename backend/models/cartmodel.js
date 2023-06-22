const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    jeans: [
        {
            data: { type: mongoose.Schema.Types.ObjectId, ref: "jean" },
            Quantity: { type: Number, default: 1, min: 1 }
        }


    ],
    tops: [
        {
            data: {
                type: mongoose.Schema.Types.ObjectId, ref: "top"
            },
            Quantity: { type: Number, default: 1, min: 1 }
        }
    ],
    shoes: [
        {
            data: {
                type: mongoose.Schema.Types.ObjectId, ref: "shoe"
            },
            Quantity: { type: Number, default: 1, min: 1 }
        }
    ]

})


const CartModel = mongoose.model("cart", CartSchema)

module.exports = CartModel