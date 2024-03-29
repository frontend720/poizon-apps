const express = (require = require("express"));
const imageRouter = express.Router();
// const { generate } = require("stability-client");

// const api_key = process.env.STABILITY_API_KEY;

// imageRouter.post("/generate_image", async (req, res) => {
//   const request =  generate({
//     prompt: req.body.prompt,
//     apiKey: api_key,
//     cfgScale: 15,
//     imagePrompt: {
//       mime: "image/jpeg",
//     },
//   });
//   try {
//     request.on("image", ({ buffer, filePath }) => {
//       res.send(
//         { success: true, message: "Image generated successfully." },
//         filePath
//       );
//     });
//     request.on("end", (data) => {
//       console.log("Generation completed", data);
//     });
//     request.on("error", (error) => {
//       console.error("Error generating image", error);
//       res
//         .status(500)
//         .send({ success: false, message: "Error generating image" });
//     });
//   } catch (error) {
//     res.status(500).send({ message: "error." });
//   }
// });

// const express = require('express');
const { generate } = require('stability-client');

const api_key = process.env.STABILITY_API_KEY;

imageRouter.post('/generate_image', async (req, res) => {
  try {
    const request = generate({
      prompt: req.body.prompt,
      apiKey: api_key,
      cfgScale: 15,
      imagePrompt: {
        mime: 'image/jpeg',
      },
    });

    request.on('image', ({ buffer, filePath }) => {
      res.send({ success: true, message: 'Image generated successfully.', filePath });
    });

    request.on('end', (data) => {
      console.log('Generation completed', data);
    });

    request.on('error', (error) => {
      console.error('Error generating image', error);
      res.status(500).send({ success: false, message: 'Error generating image' });
    });
  } catch (error) {
    console.error('Server error', error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


module.exports = imageRouter;
