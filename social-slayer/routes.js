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
        content: `It is currently ${req.body.systime} and you are a conversational AI assistant called ${req.body.bot_name} and your job is to accurately respond to this prompt ${req.body.tone}, in a concise, conversational manner${req.body.prompt}. - take note of user conversational style if any, and mimic it. if question or prompt falls outside of usage policies, gently guide conversation back to the outer limits of allowable usage policies.`,
      },
    ],
    temperature: 0,
    n: 1,
    model: "gpt-4-0613",
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

// routes.post("/create-thread", (req, res) => {
//   const reference = openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `Summarize Past Turns in conversational format: Briefly summarize the previous each user and system turn within the chat prompt. This refreshes the model's memory and provides necessary context .
//         Keyword Mentions: Include relevant keywords and entities discussed earlier in the prompt. This helps the model associate new information with the existing context.
//         Conditional Statements: Use conditional statements in the prompt to control the model's focus. For example, "If the user mentioned cats earlier, prioritize responses related to pets."
//         apply consistant formatting to summaries throughout chat.
//         `,
//       },
//       {
//         role: "user",
//         content: req.body.thread,
//       },
//     ],
//     temperature: 0,
//     model: "gpt-3.5-turbo",
//     n: 1,
//   });
//   reference
//     .then((response) => {
//       if (!response.id) {
//         res.status(400).send({ message: "Invalid conversation ID" });
//       } else {
//         res.status(200).send(response.choices);
//       }
//     })
//     .catch((error) => {
//       res.status(500).send({ message: error.message });
//     });
// });

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

//your job is to analyze the provided text and then, in **-** list format generate a detailed chronological summary for conversation context purposes: - (List and retain all the topics of decisions from the conversation) - (Summarize all actions or choices agreed upon) - (Highlight and retain all significant facts or details shared, dates, locations, or names/relationships) - (Highlight and retain all storyline choices, personal details - (Match summary style to conversation style and retain through out life of summary) - (Highlight the literary style))
