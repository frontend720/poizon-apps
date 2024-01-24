const { v4: uuid } = require("uuid");
const express = require("express");

const storefrontRouter = express.Router();
const { db, app } = require("../config");

console.log(uuid());

storefrontRouter.post("/restaurant_info/:merchant_id", (req, res) => {
  const merchant_id = req.params.merchant_id;
  const data = {
    merchant_id: uuid(),
    restaurant_name: req.body.restaurant_name,
    address: req.body.address,
    phone: req.body.phone,
    cuisine_type: req.body.cuisine_type,
    minimum_order_amount: req.body.minimum_order_amount,
    delivery_radius: req.body.delivery_radius,
    hours: req.body.hours,
  };
  const collectionRef = db
    .collection("merchants")
    .doc(merchant_id)
    .collection("restaurants")
    .doc(req.body.restaurant_name.replaceAll(" ", "_").toLowerCase())
    .set(data, { merge: true });
  collectionRef
    .then((restaurant) => {
      if (!restaurant) {
        res.status(400).send({ message: "Required info missing" });
      } else {
        res.status(200).send(restaurant);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

storefrontRouter.put("/update/:restaurant_id/:update_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const update_id = req.params.update_id;
  const data = {
    restaurant_name: req.body.restaurant_name,
    address: req.body.address,
    phone: req.body.phone,
    cuisine_type: req.body.cuisine_type,
    minimum_order_amount: req.body.minimum_order_amount,
    delivery_radius: req.body.delivery_radius,
    hours: req.body.hours,
  };
  const collectionRef = db
    .collection("merchants")
    .doc(restaurant_id)
    .collection("restaurants")
    .doc(update_id)
    .set(data, { merge: true });
  collectionRef
    .then((update) => {
      if (!update) {
        res.status(400).send({ message: "Required info missing" });
      } else {
        res.status(200).send(update);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

storefrontRouter.delete("/delete/:restaurant_id/:update_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const update_id = req.params.update_id;
  const collectionRef = db
    .collection("merchants")
    .doc(restaurant_id)
    .collection("restaurants")
    .doc(update_id)
    .delete();
  collectionRef
    .then((del) => {
      if (!del) {
        res
          .status(400)
          .send({
            message:
              "Unable to delete restaurant info right now. Try again later",
          });
      } else {
        res.status(200).send(del.writeTime);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

module.exports = storefrontRouter;
