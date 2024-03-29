const express = require("express");
const routes = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

routes.post("/", (req, res) => {
  const reference = openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content:
          `You are a highly creative and collaborative AI assistant, tasked with helping to create a ${req.body.perspective} immersive choose-your-own-adventure game. Your goal is to, in short story building format, generate engaging and coherent story elements that will captivate players and keep them invested in the narrative.`,
      },
      {
        role: "user",
        content: req.body.prompt,
      },
    ],
    max_tokens: 1500,
    temperature: 1,
    n: 1,
  });
  reference
    .then((response) => {
      if (!response.id) {
        res.status(400).send({ message: "Invalid message ID" });
      } else {
        res.status(200).send(response.choices);
      }
    })
    .catch((error) => console.log(error.message));
});

routes.post("/continue", (req, res) => {
  const reference = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `conversation detailed summary: - (List the topics or decisions from the conversation) - (Summarize any actions or choices agreed upon) - (Highlight any significant facts or details shared, dates, locations, or names/relationships) - (Highlight any storyline choices, retain personal details) - (Mention narrative style) 
        `,
      },
      {
        role: "user",
        content: req.body.prompt,
      },
    ],
    max_tokens: 1500,
    temperature: 1,
    model: "gpt-4-0613",
    n: 1,
  });
  reference
    .then((response) => {
      if (!response.id) {
        res.status(400).send({ message: "Invalid conversation ID" });
      } else {
        res.status(200).send(response.choices);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

console.log(openai);

module.exports = routes;
