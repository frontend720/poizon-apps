const express = require("express")
const cors = require("cors")
const app = express()
const morgan = require("morgan")
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/", require("./routes"))

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT)
})