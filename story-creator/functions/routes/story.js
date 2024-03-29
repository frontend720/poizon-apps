const express = require("express");
const storyRouter = express.Router();
const app = require("../config");
const openai = require("../aiConfig");

storyRouter.post("/", (request, response) => {
  const {
    chapter_number,
    total_chapters,
    genre,
    characters,
    setting,
    time,
    theme,
  } = request.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "I can help you build stories!",
      },
      {
        role: "user",
        user: `write chapter number ${chapter_number} of ${total_chapters} of a ${genre} book about ${theme} with ${characters} characters in a ${setting} setting, the book should take place in the ${time}'s.`,
      },
    ],
    model: "gpt-4",
    n: 3,
    temperature: 1,
    max_tokens: 16000,
  });
  completion.then((data) => {
    if (!data.id) {
      response
        .status(400)
        .send({
          message:
            "Oops! We encountered an issue while fetching the chapter. Please refresh the page or try again in a few minutes.",
        });
    } else {
      response.status(200).send(data);
    }
  }).catch((error) => {
    res.status(error.code).send({message: "Error fetching chapter", error: error.code})
  })
});

module.exports = storyRouter;
