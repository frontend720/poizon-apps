const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const openai = require("./aiConfig")

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json())
console.log(openai)

app.get("/hello", (req, res) => {
  res.send(
    "Hello, this is a system meant to help creators build the best content possible"
  );
});

app.use("/chat", require("./routes/textPrompt"))
app.use("/image", require("./routes/imagePrompt"))

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
