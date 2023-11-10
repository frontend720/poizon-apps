const express = require("express");
const imageRouter = express.Router();
const openai = require("../aiConfig");

imageRouter.post("/", (req, res) => {
  const imageRef = openai.images.generate({
    model: "dall-e-3",
    prompt: req.body.prompt
  });
  imageRef
    .then((data) => {
      if (!data) {
        return res.status(500).send("Something went wrong");
      } else {
        return res.status(200).send(data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = imageRouter;
