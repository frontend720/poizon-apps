const express = require("express");
const scriptRouter = express.Router();
const openai = require("../config");

scriptRouter.post("/create", (req, res) => {
  const {
    year
  } = req.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Cold case summary for a fictional murder case in the year ${year}.
                    `,
      },
    ],
    model: "gpt-4",
    n: 1,
    temperature: 1,
    max_tokens: 2500,
  });
  completion
    .then((data) => {
      if (!data.created) {
        res
          .status(404)
          .send({ message: "Script not created... Try again later." });
      } else {
        res.status(200).send(data.choices);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

scriptRouter.post("/continue", (req, res) => {
  const { body } = req.body;
  const completion = openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `with this request
         Body ${body}, 
         continue developing the mystery for the group to identify. Fully develop a motive add 3 potential story branches at the end`,
      },
    ],
    model: "gpt-4-1106-preview",
    n: 1,
    temperature: 1
  });
  completion
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: "Script not created... Try again later." });
      } else {
        res.status(200).send(data.choices);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

scriptRouter.post("/wrap", (req, res) => {
    const {body} = req.body
    const completion = openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Complete mystery script using this body 
                ${body}
                and at the end present a multiple choice answer for who did it. at the very end present who did it.` 
            }
        ],
        model: "gpt-4-1106-preview",
        n: 1,
        temperature: 1
    })
    completion.then((data) => {
        if (!data) {
            res.status(404).send({message: "Script not created... Try again later."})
        } else {
            res.status(200).send(data.choices)
        }
    }).catch((error) => {
        res.status(500).send({message: error.code})
    })
})

module.exports = scriptRouter;
