const express = require("express");
const storyRouter = express.Router();
const openai = require("../aiConfig");

console.log(openai);

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
        content: `write chapter number ${chapter_number} of ${total_chapters} of a ${genre} book with ${theme} themes with ${characters} main characters in a subtle ${setting} setting, the book should take place in the ${time}'s. subtlely set the scene`,
      },
    ],
    model: "gpt-4",
    n: 1,
    temperature: 1.05,
  });
  completion
    .then((data) => {
      if (!data.id) {
        response.status(400).send({
          message:
            "Oops! We encountered an issue while fetching. Please refresh the page or try again in a few minutes.",
        });
      } else {
        response.status(200).send(data.choices);
      }
    })
    .catch((error) => {
      response.status(500).send({ message: error.code });
    });
});

storyRouter.post("/page", (request, response) => {
  const { chapter_number, total_chapters, genre, body } = request.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `continue and write chapter number ${chapter_number} of ${total_chapters} of this story ${body}`,
      },
    ],
    model: "gpt-4",
    n: 1,
    temperature: 1,
  });
  completion
    .then((data) => {
      if (!data.id) {
        response.status(400).send({
          message:
            "Ooops! We encounter an issue while fetching. Please refresh the page or try again in a few minutes.",
        });
      } else {
        response.status(200).send(data.choices);
      }
    })
    .catch((error) => {
      response
        .status(500)
        .send({ message: "error fetching data ", error: error.code });
    });
});

module.exports = storyRouter;
