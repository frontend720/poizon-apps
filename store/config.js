const admin = require("firebase-admin")
const serviceAccount = require("./firebase.json")
const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    credential: admin.credential.cert(serviceAccount)

}

const app = admin.initializeApp(config)
const db = admin.firestore(app)

module.exports = {db, app}