const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use("/", cors(), require("./bookRouter"));

app.listen(5340, () => {
  console.log("lisntening on port 5340");
});
