const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())

const port = process.env.PORT || 3500

app.use("/", require("./routes/taskRouter"))

app.listen(port, () => {
    console.log("listening on port " + port)
})