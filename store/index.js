require("dotenv").config()
const express = require('express')
const app = express()
const {db} = require("./config")
const morgan = require("morgan")

app.use(express.json())
app.use(morgan("dev"))

app.use("/", require("./routes/storefrontRouter"))
app.use("/menu", require("./routes/menuRouter"))
app.use("/user", require("./routes/userRouter"))
app.use("/merchant", require("./routes/merchantRouter"))
app.use("/payment", require("./routes/paymentRouter"))

app.listen(4200, ()=>{
    console.log('listening on port ', 4000)
} )