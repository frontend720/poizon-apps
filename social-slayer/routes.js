const express = require("express");
const routes = express.Router();
const { app, openai } = require("./configurators");
const { getFirestore } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");

const db = getFirestore(app);

console.log(uuidv4());

routes.post("/new", (req, res) => {
  const chatReference = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `It is currently ${req.body.systime} and you a ${req.body.tone}, adaptable, conversational AI assistant called ${req.body.bot_name} and your job is to respond to this prompt ${req.body.prompt}`,
      },
    ],
    temperature: 1.15,
    n: 1,
    model: "gpt-4-turbo-preview",
    max_tokens: 900,
    user: req.body.userId,
  });

  //

  chatReference
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Try again..." });
      } else {
        res.status(200).send(data.choices);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// routes.post("/playlists", (req, res) => {
//   // playlist builder ai if given a genre will respond with n songs with their artists with a uuid attached
//   // https://developers.google.com/youtube/v3/getting-started
//   const reference = openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are an AI playlist builder called BeatBot and your function is to create a simple json file of ${req.body.count} ${req.body.genre} songs or songs by ${req.body.artist} from the Deezer catalog that fit this mood ${req.body.mood}. use title and artist as the key value pairs. no prefix. start with brackets"`,
//       },
//     ],
//     temperature: 1.0,
//     n: 1,
//     model: "gpt-3.5-turbo",
//     max_tokens: 1500,
//     // user: req.body.userId,
//   });
//   reference
//     .then((data) => {
//       if (!data) {
//         res.status(500).send({ message: "something went wrong, try again." });
//       } else {
//         res.status(200).send({ message: data.choices });
//       }
//     })
//     .catch((error) => console.log(error.code));
// });

routes.post("/save", (req, res) => {
  const data = {
    system: req.body.system,
    user: req.body.user,
  };

  const collectionRef = db
    .collection("accounts")
    .doc(req.body.accountId)
    .collection("conversations")
    .doc(req.body.conversationId)
    .set(data);
  collectionRef
    .then((conversation) => {
      if (!conversation) {
        res.status(404).send({ message: "No conversation to save." });
      } else {
        res.status(200).send(conversation);
      }
    })
    .catch((error) => res.status(500).send({ message: error.code }));
});

module.exports = routes;

