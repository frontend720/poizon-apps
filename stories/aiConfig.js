const {OpenAI} = require("openai")
const {initializeApp} = require("firebase-admin/app")

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})


const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseUrl: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
}

const app = initializeApp(config)

module.exports = {openai, app}