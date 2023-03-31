const express = require('express');
const cors = require("cors");
const connection = require('./connection/connection');
const userRouter = require('./routes/userRoute');
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())


app.use("/users",userRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("server is connected to data base SuccesFully");
    } catch (error) {
        console.log("error");
        console.log("error while connecting to db");
    }
    console.log("connected to port Succesfully");

})