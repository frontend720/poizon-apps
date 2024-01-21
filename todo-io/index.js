const express = require('express')
const app = express()
require("dotenv").config()
const morgan = require("morgan")

app.use(express.json())
app.use(morgan("dev"))
app.use("/", require("./routes/todoRouter"))

app.listen(3000, () => {
    console.log('Listening on port 3000')
})