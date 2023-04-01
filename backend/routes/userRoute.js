const express = require('express');
const UserModel = require('../models/usermodel');
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {
        bcrypt.hash(password, 4, async (err, hash) => {
            const user = new UserModel({ name, email, password: hash })
            await user.save()
            res.status(201).send({ "msg": "Registration Succesfull" })

        });
    } catch (error) {
        res.status(401).send({ "msg": "Some error occourd while  Registration" })

    }

})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    res.status(201).send({ "msg": "login succesfull", "token": jwt.sign({ "userID": user._id }, "privateKey", { expiresIn: '3h' }),"userdetails":user })
                } else {
                    res.status(401).send({ "msg": "Wrong Credentials" })
                }
            });
        } else {
            res.status(401).send({ "msg": "login failed,user is not present" })

        }
    } catch (error) {
        res.status(401).send({ "msg": "error occourd while login " })

    }
})



userRouter.get("/", async (req, res) => {
    const user = await UserModel.find()
    res.status(201).send(user)
})
module.exports = userRouter