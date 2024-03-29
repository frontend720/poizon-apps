const { OpenAI } = require("openai");
const express = require("express");
const app = express();
const router = express.Router();
const morgan = require("morgan")
require("dotenv").config()

app.use(express.json());
app.use(morgan("dev"))

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

router.post("/", (req, res) => {
    const myAssistant = openai.beta.assistants.create({
        instructions:
          "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Math Tutor",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-1106-preview",
      });
    
      res.send(myAssistant)
    
});

app.listen(4000, () => {
    console.log("listening")
})