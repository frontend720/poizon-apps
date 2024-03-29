const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config()
const cors = require("cors");

app.use(express.json())
app.use(fileUpload());
app.use(cors())

app.use(morgan("dev"));

app.use("/", require("./routes/user"));
app.use('/flows', require("./routes/posts"))
app.use("/comments", require("./routes/comments"))

app.listen(4600, () => {
  console.log("Listening on port" + 4500);
});
