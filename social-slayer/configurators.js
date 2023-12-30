const { OpenAI } = require("openai");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin")

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    credential: admin.credential.cert(require("./firebase.json"))
};

const app = initializeApp(config);
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

module.exports = {app, openai}