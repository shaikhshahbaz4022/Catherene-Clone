const express = require("express")
const jeansModel = require("../models/jeansmodel")
const jeansRouter = express.Router()

jeansRouter.get("/", async (req, res) => {
    try {
        const data = await jeansModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ "msg": "error occured while getting jeans" })
    }
})

jeansRouter.post("/add", async (req,res)=>{
    try {
        const data = new jeansModel(req.body)
        await data.save()
        res.status(200).send({"msg":"Jeans Added Succesfully"})
        
    } catch (error) {
        res.status(400).send({ "msg": "error occured while Posting jeans" })
        
    }
})



module.exports = jeansRouter