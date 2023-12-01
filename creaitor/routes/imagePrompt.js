const express = require("express");
const imageRouter = express.Router();
const openai = require("../aiConfig");
const fs = require("fs");

// const truck = require("./truck.png")

imageRouter.post("/", (req, res) => {
  const imageRef = openai.images.generate({


// Image models: "dall-e-2", "dall-e-3"
// n = number of images to retrieve

    model: req.body.model,
    prompt: req.body.prompt,
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




imageRouter.post("/edit", (request, response) => {
  const imageRef = openai.images.edit({
    image: fs.createReadStream("https://th.bing.com/th/id/OIG.RM3LgBmU5LzJ9HsTo4WF?pid=ImgGn"),
    // mask: fs.createReadStream(""),
    prompt: request.body.prompt
  })
  imageRef.then((data) => {
    console.log(data.data)
  })
})


// const request = new ClientRequest("/")
// console.log(request)

module.exports = imageRouter;

