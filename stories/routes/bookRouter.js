const express = require("express");
const storyRouter = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const { openai, app } = require("../aiConfig");
const { v4: uuidv4 } = require("uuid");
console.log(openai);
const path = require("path");

const db = getFirestore(app);

storyRouter.post("/", (request, response) => {
  const { genre, about, perspective, audience, characters, type, part } =
    request.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Complete Story Prompt:
        Genre: ${genre}
        Type: ${type}
        About: ${about}
        written in
        Perspective: ${perspective}
        for
        Audience: ${audience}
        using a minimum of at least
        ${characters} tokens ,
        with title.
        `,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    n: 1,
    temperature: 1
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
      response.status(500).send({ message: "Something went wrong" });
    });
});

storyRouter.post("/page", (request, response) => {
  const { genre, type, body, characters } = request.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
       Conclusion of
        ${genre}
         of
        ${type}
        using this body
         ${body}
          in 
          ${characters}
           characters `,
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

// storyRouter.post("/save", (request, response) => {
//   const page = request.body.page;
//   const collectionRef = db
//     .collection("users")
//     .doc("jareds")
//     .collection("stories")
//     .doc(uuidv4())
//     .set(page);
//   collectionRef
//     .then((data) => {
//       if (!data) {
//         response
//           .status(400)
//           .send({ message: "Unable to save page... Please try again" });
//       } else {
//         response.status(200).send({ message: "Successfully saved paged" });
//       }
//     })
//     .catch((error) => {
//       response.status(500).send({ message: error.code });
//     });
// });

module.exports = storyRouter;
