const express = require("express")
const app = express()
require("dotenv").config()

app.use(express.json())

app.use("/", require("./chatRoute"))

app.listen(3800, ()=> {
    console.log("listening on port 3800")
})