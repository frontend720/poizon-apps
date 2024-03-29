const express = require("express")
const chatRoute = express()
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config()

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genai.getGenerativeModel({
    model: "gemini-pro"
})

console.log(genai)

chatRoute.post("/", async (req, res) => {
    
 const chat = model.startChat({
        history: [
         
            {
                role: "user",
                parts: "I am in Denver today."
            },
    
            {
                role: "model",
                parts: "Great to meet you. What would you like to know?"
            }
        ],
        
        generationConfig: {
            maxOutputTokens: 5200
        }
    })
    

    const result = await chat.sendMessage(req.body.question);
    const response = result.response;
    const text = response.text();
    res.send(text);

})

module.exports = chatRoute