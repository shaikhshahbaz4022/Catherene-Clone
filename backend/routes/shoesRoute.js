const express = require('express');
const shoesModel = require('../models/shoesmodel');

const ShoesRoute = express.Router()

ShoesRoute.get("/", async (req, res) => {
    try {
        const data = await shoesModel.find()
        res.status(201).send(data)
    } catch (error) {
        res.status(401).send({ "msg": "error occured while getting jeans" })
    }
})

ShoesRoute.post("/add", async (req,res)=>{
    try {
        const data = new shoesModel(req.body)
        await data.save()
        res.status(201).send({"msg":"Jeans Added Succesfully"})
        
    } catch (error) {
        res.status(401).send({ "msg": "error occured while Posting jeans" })
        
    }
})

module.exports = ShoesRoute