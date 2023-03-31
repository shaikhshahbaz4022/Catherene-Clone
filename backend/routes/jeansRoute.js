const express = require("express")
const jeansModel = require("../models/jeansmodel")
const jeansRouter = express.Router()

jeansRouter.get("/", async (req, res) => {
    try {
        const data = jeansModel.find()
        res.status(201).send(data)
    } catch (error) {
        res.status(401).send({ "msg": "error occured while getting jeans" })
    }
})

jeansRouter.post("/add", async (req,res)=>{
    try {
        const data = new jeansModel(req.body)
        await data.save()
        res.status(201).send({"msg":"Jeans Added Succesfully"})
        
    } catch (error) {
        res.status(401).send({ "msg": "error occured while Posting jeans" })
        
    }
})

module.exports = jeansRouter