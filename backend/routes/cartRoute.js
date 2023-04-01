const express = require('express');

const CartModel = require('../models/cartmodel');


const cartRoute = express.Router()

cartRoute.get("/", async (req, res) => {
    try {
        const data = await CartModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ "msg": "error occured while getting jeans" })
    }
})

cartRoute.post("/post", async (req,res)=>{
    try {
        const data = new CartModel(req.body)
        await data.save()
        res.status(200).send(data)
        
    } catch (error) {
        res.status(400).send({ "msg": error.message })
        
    }
})

module.exports = cartRoute