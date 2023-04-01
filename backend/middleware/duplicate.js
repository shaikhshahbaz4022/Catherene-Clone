const CartModel = require("../models/cartmodel")

const duplicate = async (req, res, next) => {
    try {
        const data = await CartModel.findOne({ id: req.body.id })
        if (data) {
            res.status(200).send({ "msg": "Data already present" })
        } else {
            next()
        }
    } catch (error) {
        res.status(401).send({ "msg": error.message })
    }
}
module.exports = duplicate