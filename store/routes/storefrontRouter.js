const { v4: uuid } = require("uuid");
const express = require("express");

const storefrontRouter = express.Router();
const { db } = require("../config");

console.log(uuid());

// Create restaurant

storefrontRouter.post("/restaurant_info/:merchant_id", (req, res) => {
  const merchant_id = req.params.merchant_id;
  const data = {
    merchant_id: merchant_id,
    restaurant_name: req.body.restaurant_name,
    address: req.body.address,
    phone: req.body.phone,
    cuisine_type: req.body.cuisine_type,
    minimum_order_amount: req.body.minimum_order_amount,
    delivery_radius: req.body.delivery_radius,
    hours: req.body.hours,
  };
  const collectionRef = db
    // .collection("merchants")
    // .doc(merchant_id)
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

// Get a restaurant

storefrontRouter.get("/:restaurant_id", (req, res) => {
  const restaurantId = req.params.restaurant_id;
  const collectionRef = db.collection("restaurants").doc(restaurantId).get();
  collectionRef
    .then((restaurant) => {
      if (!restaurant.exists) {
        res.status(400).send({ message: "Restaurant does not exist" });
      } else {
        res.status(200).send(restaurant.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Get all restaurants

storefrontRouter.get("/", (req, res) => {
  const collectionRef = db.collection("restaurants").get();
  const restaurants = [];
  collectionRef
    .then((data) => {
      data.forEach((restaurant) => {
        if (!restaurant.exists) {
          res.status(400).send({ message: "Unable to retrieve restaurants." });
        } else {
          restaurants.push(restaurant.data());
        }
      });
      res.send(restaurants);
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Update restaurant info

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

// Delete restaurant info

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
        res.status(400).send({
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
