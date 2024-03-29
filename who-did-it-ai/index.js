const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')
require("dotenv").config();

app.use(express.json());
app.use(cors())
app.use(morgan("dev"));

console.log(process.env.OPENAI_API_KEY);

app.use("/", require("./routes/scriptRouter"))

app.listen(5200, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
