const express = require('express');
const cors = require("cors");
const connection = require('./connection/connection');
const userRouter = require('./routes/userRoute');
const jeansRouter = require('./routes/jeansRoute');
const topsRoute = require('./routes/topsRoute');
const ShoesRoute = require('./routes/shoesRoute');
const cartRoute = require('./routes/cartRoute');
const auth = require('./middleware/auth');
const duplicate = require('./middleware/duplicate');
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())

/////////
app.use("/users", userRouter)
////////
app.use("/jeans", jeansRouter)
////////
app.use("/tops", topsRoute)
////////
app.use("/shoes", ShoesRoute)

///////
app.use(duplicate)
app.use(auth)
app.use("/cart",cartRoute)
///////

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