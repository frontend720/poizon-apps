const express = require("express");
const paymentRouter = express.Router();
const { db } = require("../config");
const { v4: uuid } = require("uuid");

// Create payment method instance

paymentRouter.post("/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const data = {
    card_number: req.body.card_number,
    expiration: req.body.expiration,
    cvc: req.body.cvc,
    zipcode: req.body.zipcode,
    address: req.body.address,
  };
  const collectionRef = db
    .collection("users")
    .doc(user_id)
    .collection("payment-info")
    .doc(uuid())
    .set(data);
  collectionRef
    .then((payment) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "payment info must be provided to continue" });
      } else {
        res.status(200).send(payment);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Get Payment method

paymentRouter.get("/:user_id/:payment_id", (req, res) => {
  const user_id = req.params.user_id;
  const payment_id = req.params.payment_id;

  const paymentRef = db
    .collection("users")
    .doc(user_id)
    .collection("payment-info")
    .doc(payment_id)
    .get();
  paymentRef
    .then((payment) => {
      if (!payment.exists) {
        res.status(400).send({ message: "payment method does not exist" });
      } else {
        res.status(200).send(payment.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Update payment method

paymentRouter.put("/:user_id/:payment_id", (req, res) => {
  const user_id = req.params.user_id;
  const payment_id = req.params.payment_id;
  const data = {
    card_number: req.body.card_number,
    expiration: req.body.expiration,
    cvc: req.body.cvc,
    zipcode: req.body.zipcode,
    address: req.body.address,
  };
  const paymentRef = db
    .collection("users")
    .doc(user_id)
    .collection("payment-info")
    .doc(payment_id)
    .set(data, { merge: true });

  paymentRef
    .then((payment) => {
      if (!payment) {
        res
          .status(400)
          .send({ message: "Unable to update payment information" });
      } else {
        res.status(200).send(payment);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Delete payment method

paymentRouter.delete("/:user_id/:payment_id", (req, res) => {
  const user_id = req.params.user_id;
  const payment_id = req.params.payment_id;
  const paymentRef = db
    .collection("users")
    .doc(user_id)
    .collection("payment-info")
    .doc(payment_id)
    .delete();
  paymentRef
    .then((payment) => {
      if (!payment) {
        res
          .status(400)
          .send({ message: "Unable to delete payment info, try again later." });
      } else {
        res.status(200).send(payment);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

module.exports = paymentRouter;
