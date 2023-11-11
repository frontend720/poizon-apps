const express = require("express");
const imageRouter = express.Router();
const openai = require("../aiConfig");

imageRouter.post("/", (req, res) => {
  const imageRef = openai.images.generate({


// Image models: "dall-e-2", "dall-e-3"
// n = number of images to retrieve

    model: req.body.model,
    prompt: req.body.prompt,
    

    // model: req.body.model,
    n: req.body.n
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
