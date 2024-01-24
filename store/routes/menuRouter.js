const { v4: uuid } = require("uuid");
const express = require("express");
const menuRouter = express.Router();
const { db, app } = require("../config");

menuRouter.post("/:merchantId/:restaurantId", (req, res) => {
  const merchant_id = req.params.merchantId;
  const restaurant_id = req.params.restaurantId;
  const data = {
    menu_item_id: uuid(),
    restaurant_id: restaurant_id,
    name: req.body.name,
    cuisine: req.body.cuisine, // American, Italian, African , Middle Eastern, Chinese, Japanese, Mexican, Indian, Thai, Vietnamese, Mediterranean, Korean, BBQ, Other
    description: req.body.description,
    price: req.body.price,
    category: req.body.category, // Appetizers, Sides, Mains, Desserts, Beverages
    imageURL: req.body.imageURL,
    dietary_flags: req.body.dietary_flags, // Vegetarian, Vegan, Gluten-Free, Dairy-Free, Soy-Free, Nut-Free, Egg-Free, Shellfish-Free, Kosher, Halal, Spicy
    availability: req.body.availability,
  };
  const menu_item_reference = db
    .collection("merchants")
    .doc(merchant_id)
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .doc(req.body.name.replaceAll(" ", "_").toLowerCase())
    .set(data, { merge: true });
  menu_item_reference
    .then((item) => {
      if (!item) {
        res.status(400).send({ message: "Required info missing" });
      } else {
        res.status(200).send(item);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

menuRouter.delete("/:merchant_id/:restaurant_id/:menu_id", (req, res) => {
  const merchant_id = req.params.merchant_id;
  const restaurant_id = req.params.restaurant_id;
  const menu_id = req.params.menu_id;
  const collectionRef = db
    .collection("merchants")
    .doc(merchant_id)
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .doc(menu_id)
    .delete();
  collectionRef
    .then((item) => {
      if (!item) {
        res
          .status(400)
          .send({ message: "Unable to delete menu item. Try again later." });
      } else {
        res.status(200).send(item);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

module.exports = menuRouter;
