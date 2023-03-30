const express = require('express');
const cors = require("cors");
const connection = require('./connection/connection');
const userRouter = require('./routes/userRoute');


const app = express()
app.use(express.json())
app.use(cors())


app.use("/users",userRouter)

app.listen(8000, async () => {
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log("error");
        console.log("error while connecting to db");
    }
    console.log("connected to port no 8000");

})