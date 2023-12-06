const express = require("express");
const textRouter = express.Router();
const { db } = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

const openai = require("../aiConfig");

textRouter.post("/", (req, res) => {
  const prompt = req.body.prompt;
  const response = req.body.response
  const completion = openai.chat.completions.create({
    // Text models: "gpt-3.5-turbo", "gpt-4"
    // n = number of text responses to retrieve

    messages: [
      {
        role: "system",
        content: response,
      },
      { role: "user", content: `${prompt}` },
    ],
    model: req.body.model,
    n: req.body.n,
    temperature: req.body.temperature,
    max_tokens: 4000,
  });
  completion
    .then((data) => {
      if (!data) {
        return res.status(500).send(new Error("Something went wrong"));
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      console.log(error.code);
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
