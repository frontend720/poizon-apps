const express = require("express");
const imageRouter = express.Router();
const openai = require("../aiConfig");
const fs = require("fs");
const path = require("path");

// const truck = require("./truck.png")

imageRouter.post("/", (req, res) => {
  const imageRef = openai.images.generate({
    // Image models: "dall-e-2", "dall-e-3"
    // n = number of images to retrieve
    model: req.body.model,
    prompt: req.body.prompt,
    n: req.body.n,
    quality: "hd",
    style: "vivid",
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

imageRouter.post("/edit", async (request, response) => {
  const image = request.body.image;
  const mask = request.body.mask;
  const editPrompt = request.body.editPrompt;
  const res = await openai.images.edit({
    image: image,
    mask: mask,
    prompt: editPrompt,
    model: "dall-e-2", // The model to use
    n: 3, // The number of images to generate
    size: "512x512", // The size of the images
  });

  // Retrieve the variation image URLs from the API response
  const variation_image_urls = res.data.data.map((item) => item.url);

  // Display or save the variation images as you wish
  console.log(variation_image_urls);
});

// const request = new ClientRequest("/")
// console.log(request)

module.exports = imageRouter;
