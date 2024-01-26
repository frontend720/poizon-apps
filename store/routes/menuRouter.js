const { v4: uuid } = require("uuid");
const express = require("express");
const menuRouter = express.Router();
const { db, app } = require("../config");

// Create a menu item

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
    merchant_id: merchant_id,
    thumbnail: req.body.thumbnail || null
  };
  const menu_item_reference = db

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

// Retrieve a menu item

menuRouter.get("/:restaurant_id/:menu_item_id", (req, res) => {
  const merchant_id = req.params.merchant_id;
  const restaurant_id = req.params.restaurant_id;
  const menu_item_id = req.params.menu_item_id;
  const menuItemRef = db
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .doc(menu_item_id)
    .get();
  menuItemRef
    .then((item) => {
      if (!item.exists) {
        res.status(400).send({ message: "Unable to fetch menu item" });
      } else {
        res.status(200).send(item.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Retrieve all menu items

menuRouter.get("/:restaurant_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const restaurantMenu = [];

  const collectionRef = db
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .get();
  collectionRef
    .then((menu) => {
      menu.forEach((item) => {
        if (!item.exists) {
          res.status(400).send({ message: "Unable to fetch menu" });
        }
        if (item.exists) {
          restaurantMenu.push(item.data());
        }
      });
      res.status(200).send(restaurantMenu);
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Update a menu item

menuRouter.put("/:restaurant_id/:menu_item_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const menu_item_id = req.params.menu_item_id;
  const data = {
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
  const menuItemRef = db
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .doc(menu_item_id)
    .update(data, { merge: true });

  menuItemRef
    .then((item) => {
      if (!item) {
        res.status(400).send({ message: "Unable to update menu item." });
      } else {
        res.status(200).send(item);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// Delete a menu item

menuRouter.delete("/:restaurant_id/:menu_item_id", (req, res) => {
  const restaurant_id = req.params.restaurant_id;
  const menu_item_id = req.params.menu_item_id;
  const collectionRef = db
    .collection("restaurants")
    .doc(restaurant_id)
    .collection("menu_item")
    .doc(menu_item_id)
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
