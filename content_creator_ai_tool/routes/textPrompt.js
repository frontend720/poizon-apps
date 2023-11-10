const express = require("express");
const textRouter = express.Router();

const openai = require("../aiConfig");

textRouter.post("/", (req, res) => {
   
  const completion = openai.chat.completions.create({
    messages: [{ role: "system", content: req.body.prompt || "Short random fact about fall" }],
    model: "gpt-3.5-turbo-1106",
  });
  completion
    .then((data) => {
      if (!data) {
        return res.status(500).send(new Error("Something went wrong"));
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      console.log(error.code);
    });
});

module.exports = textRouter;
