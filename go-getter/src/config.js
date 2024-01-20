import { initializeApp } from "firebase/app";

const config = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyDWFVm9q3FycDvuVzdWwiPa_6Tt_YG-HZo",
  authDomain: "bate-mates.firebaseapp.com",
  databaseURL: "https://bate-mates-default-rtdb.firebaseio.com",
  projectId: "bate-mates",
  storageBucket: "bate-mates.appspot.com",
  messagingSenderId: "999768888879",
  appId: "1:999768888879:web:7a5fa25659fbc57779d8da",
  measurementId: "G-2PERQ1DM8P"
};

export const app = initializeApp(config)
