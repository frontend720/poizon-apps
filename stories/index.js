const express = require("express");
const app = express();
require("dotenv").config()
const morgan = require("morgan")
app.use(express.json())
app.use(morgan("dev"))


app.use("/book", require("./routes/bookRouter"))

app.listen(6900, () => {
    console.log("Listening on port 6900")
})