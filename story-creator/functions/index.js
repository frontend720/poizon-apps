const functions = require("firebase-functions");
const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()



app.use(express.json())
app.use(cors())


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//



exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.storyPrompt = functions.https.onRequest(require("./routes/story"))