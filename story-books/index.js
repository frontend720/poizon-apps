const express = require("express")
const app = express()
require("dotenv").config()

app.use(express.json())

app.use("/", require("./routes"))

app.listen(5050, () => {
    console.log("listening on port" + 5050)
})