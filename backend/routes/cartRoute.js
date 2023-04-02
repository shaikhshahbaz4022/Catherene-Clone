const express = require('express');
const jwt = require('jsonwebtoken');
const CartModel = require('../models/cartmodel');


const cartRoute = express.Router()

cartRoute.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, "privateKey")
    try {
        // console.log(decoded.userID);
        if (decoded) {
            const data = await CartModel.find({ "userID": decoded.userID })
            res.status(201).send(data)
        }
    } catch (error) {
        res.status(401).send({ "msg": error.message })
    }
    // res.send("welocme")
})

cartRoute.post("/post", async (req, res) => {
    try {
        const data = new CartModel(req.body)
        await data.save()
        res.status(200).send(data)

    } catch (error) {
        res.status(400).send({ "msg": error.message })

    }
})
cartRoute.patch("/incpatch/:id", async (req, res) => {
    const { id } = req.params
    const data = await CartModel.findByIdAndUpdate({ _id: id }, { $inc: { quantity: 1 } })
    console.log(data)
    res.status(200).send({ "msg": "Data updated", data: data })
})
cartRoute.patch("/descpatch/:id", async (req, res) => {
    const { id } = req.params
    const data = await CartModel.findByIdAndUpdate({ _id: id }, { $inc: { quantity: -1 } })
    console.log(data)
    res.status(200).send({ "msg": "Data updated", data: data })
})
cartRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    const data = await CartModel.findByIdAndDelete({ _id: id })
    console.log(data)
    res.status(200).send({ "msg": "Data deleted", data: data })
})

module.exports = cartRoute