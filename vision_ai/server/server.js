const express = require('express')
const morgan = require("morgan")
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


app.listen(5000, () => {
    console.log("Listening on port 5000")
})