const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
require('dotenv').config()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use("/", require("./imageRouter"))


app.listen(process.env.PORT || 3200, () => {
    console.log("listening on port " + process.env.PORT)
})