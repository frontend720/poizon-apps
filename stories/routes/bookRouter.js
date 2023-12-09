const express = require("express");
const storyRouter = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const { openai, app } = require("../aiConfig");
const { v4: uuidv4 } = require("uuid");
console.log(openai);
const path = require("path");
const fs = require("fs");

const db = getFirestore(app);

console.log(db);

storyRouter.post("/", (request, response) => {
  const {
    education_level,
    chapter_number,
    total_chapters,
    user_presets,

    time_period,
    script_type,
    perspective,
    genre,
    audience_type,
    tone
  } = request.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "I can help you research interesting topics!",
      },
      {
        role: "user",
        content: `In at least 4000 characters, construct part number ${chapter_number} of ${total_chapters} of an in-depth analytical  ${script_type} presentation for a ${user_presets} about ${genre}. the period of the contents of the script should be ${time_period}. The presentation should be built for an ${audience_type} with a ${education_level} education level. The tone should be ${tone}. the presentation should be written in the perspective of ${perspective}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    n: 1,
    temperature: 0.5,
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
        content: `in at least 3000 characters, continue and write the next one part number ${chapter_number} of ${total_chapters} of this presentation ${body}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
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

storyRouter.post("/save", (request, response) => {
  const page = request.body.page;
  const collectionRef = db
    .collection("users")
    .doc("jareds")
    .collection("stories")
    .doc(uuidv4())
    .set(page);
  collectionRef
    .then((data) => {
      if (!data) {
        response
          .status(400)
          .send({ message: "Unable to save page... Please try again" });
      } else {
        response.status(200).send({ message: "Successfully saved paged" });
      }
    })
    .catch((error) => {
      response.status(500).send({ message: error.code });
    });
});

module.exports = storyRouter;
