const express = require("express");
const userRouter = express.Router();
const { v4: uuid } = require("uuid");
const { db } = require("../config");
const randomcolor = require("randomcolor");

// Create an account

userRouter.post("/", (req, res) => {
  const data = {
    user_id: uuid(),
    username: req.body.username,
    phone_number: req.body.phone_number,
    delivery_address: req.body.delivery_address,
    dietary_preferences: req.body.dietary_preferences,
    order_history: req.body.order_history,
    subscription: req.body.subscription, // Basic, Standard, Premium, Family
    profile_color: randomcolor(),
  };
  const userReference = db
    .collection("users")
    .doc(req.body.username.replaceAll(" ", "_").toLowerCase())
    .set(data, { merge: true });
  userReference
    .then((user) => {
      if (!user) {
        res.status(400).send({ message: "Request sent with missing data" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Get account info

userRouter.get("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const userReference = db.collection("users").doc(userId).get();
  userReference
    .then((user) => {
      if (!user) {
        res.status(400).semd("Can't retrieve user information");
      } else {
        res.status(200).send(user.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Update account info

userRouter.put("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const data = {
    username: req.body.username,
    phone_number: req.body.phone_number,
    delivery_address: req.body.delivery_address,
    dietary_preferences: req.body.dietary_preferences,
    order_history: req.body.order_history,
    subscription: req.body.subscription, // Basic, Standard, Premium, Family
  };
  const userReference = db
    .collection("users")
    .doc(userId)
    .set(data, { merge: true });
  userReference
    .then((user) => {
      if (!user) {
        res.status(400).send({
          message: "Unable to update account information. Try again later.",
        });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

userRouter.delete("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const userReference = db.collection("users").doc(userId).delete();
  userReference
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .send({ message: "Unable to delete account information." });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

module.exports = userRouter;
