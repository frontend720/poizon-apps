const admin = require("firebase-admin")

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    credential: admin.credential.cert(require("./bate-mates-firebase-adminsdk-7u7pc-3ca3c5e8c6.json"))
}

const app = admin.initializeApp(config)

const db = admin.firestore(app)

module.exports = {db, app}