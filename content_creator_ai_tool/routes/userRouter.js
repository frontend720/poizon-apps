const express = require("express");
const userRouter = express.Router();
const { db } = require("../firebaseConfig");

userRouter.post("/", (request, response) => {
  const data = {
    username: request.body.username,
    interests: request.body.interests,
    location: request.body.location,
    age: request.body.age,
    email: request.body.email,
  };

  const userRef = db.collection("users").doc(request.body.email).set(data, {merge: true});
  userRef
    .then((user) => {
      if (!user) {
        return response.status(400).send({ message: "No data to send" });
      } else {
        return response.status(200).send(user);
      }
    })
    .catch((error) => {
      console.log(error.code);
    });
});

module.exports = userRouter;
