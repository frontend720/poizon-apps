const express = require("express");
const textRouter = express.Router();
const { db } = require("../firebaseConfig");
const { v4: uuidv4 } = require("uuid");

const openai = require("../aiConfig");

textRouter.post("/", (req, res) => {
  const completion = openai.chat.completions.create({
    // Text models: "gpt-3.5-turbo", "gpt-4"
    // n = number of text responses to retrieve

    messages: [{ role: "user", content: req.body.prompt }],
    model: req.body.model,
    n: req.body.n
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

// Save response to database

textRouter.post("/save", (req, res) => {
  const textPrompt = {
    prompt: req.body.prompt
  };
  const textRef = db.collection("text-prompts").doc(uuidv4()).set(textPrompt);
  textRef
    .then((data) => {
      if (!data) {
        return res.status(500).send(new Error("Something went wrong"));
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => console.log(error.code));
});

module.exports = textRouter;
