const express = require("express");
const routes = express.Router();
const { app, openai } = require("./configurators");
const { getFirestore } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");

const db = getFirestore(app);

console.log(uuidv4())

routes.post("/new", (req, res) => {
  const chatReference = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `It is currently ${req.body.systime} and you are an AI assistant called ${req.body.bot_name} and your job is to accurately respond to this prompt in a ${req.body.tone}, conversational manner${req.body.prompt}`,
      },
    ],
    temperature: 1.00,
    n: 1,
    model: "gpt-3.5-turbo-1106",
    max_tokens: 1500,
    user: req.body.userId,
    // stream: true
  });
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

routes.post("/save", (req, res) => {
  const data = {
    system: req.body.system,
    user: req.body.user
  };

  const collectionRef = db.collection("accounts").doc(req.body.accountId).collection("conversations").doc(req.body.conversationId).set(data);
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
