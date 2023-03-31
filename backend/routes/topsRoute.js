const express = require('express');
const topsModel = require('../models/topsmodel');
const topsRoute = express.Router()

topsRoute.get("/", async (req, res) => {
    try {
        const data = await topsModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ "msg": "error occured while getting jeans" })
    }
})

topsRoute.post("/add", async (req,res)=>{
    try {
        const data = new topsModel(req.body)
        await data.save()
        res.status(200).send({"msg":"Jeans Added Succesfully"})
        
    } catch (error) {
        res.status(400).send({ "msg": "error occured while Posting jeans" })
        
    }
})

module.exports = topsRoute