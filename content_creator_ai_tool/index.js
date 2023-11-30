const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const openai = require("./aiConfig");
const db = require("./firebaseConfig");
const morgan = require("morgan");

const PORT = process.env.PORT;

app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send(
    "Hello, this is a system meant to help creators build the best content possible"
  );
});

app.use("/chat", require("./routes/textPrompt"));
app.use("/image", require("./routes/imagePrompt"));
app.use("/account", require("./routes/userRouter"));

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
