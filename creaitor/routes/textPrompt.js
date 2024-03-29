const express = require("express");
const textRouter = express.Router();
const { db } = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

const openai = require("../aiConfig");

textRouter.post("/", (req, res) => {
  const chatReference = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `you a ${req.body.tone}, adaptable, conversational AI assistant called ${req.body.bot_name} and your job is to respond to this prompt ${req.body.prompt}`,
      },
    ],
    temperature: 1.15,
    n: 1,
    model: "gpt-3.5-turbo",
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

// Get a response from a database

textRouter.get("/:id/:textId", (req, res) => {
  const emailId = req.params.id;
  const conversationId = req.params.textId;
  const collectionRef = db.collection("accounts").doc(emailId);
  const textReference = collectionRef
    .collection("conversations")
    .doc(conversationId)
    .get();
  textReference
    .then((response) => {
      res.status(200).send(response.data());
    })
    .catch((error) => {
      console.log(error.code);
    });
});

textRouter.get("/:id", (req, res) => {
  const emailId = req.params.id;
  const collectionRef = db
    .collection("accounts")
    .doc(emailId)
    .collection("conversations")
    .get();
  collectionRef
    .then((collection) => {
      return collection;
    })
    .then((doc) => {
      const docs = [];
      doc.forEach((d) => {
        if (!d) {
          return res.status(404).send({ message: "No documents to return" });
        } else {
          docs.push(d.data());
        }
      });
      res.status(200).send(docs);
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

module.exports = textRouter;
