const express = require("express");
const user = express.Router();
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const { app } = require("../config");

const db = admin.firestore(app);

console.log(db.collection);

// Post

user.post("/:id", (req, res) => {
  const accountId = req.params.id

  const date = new Date();
  const data = {
    username: req.body.username,
    age: req.body.age,
    bio: req.body.bio,
    id: accountId,
    createdAt: date,
  };
  const collectionRef = db.collection("whippers").doc(accountId).set(data, {merge: true});
  collectionRef
    .then((data) => {
      if (!data) {
        return res.status(500).send({ error: "No data to send" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((error) => {
      return res.status(500).send({ error: error.message });
    });
});

// POST AN IMAGE

user.post("/image/:id", (req, res) => {
  const accountId = req.params.id;
  const data = {
    profileImage: req.body.profileImage,
  };
  const collectionRef = db
    .collection("whippers")
    .doc(accountId)
    .set(data, { merge: true });
  collectionRef
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No image to upload" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(400).send({ message: error.code });
    });
});

// PUT

user.put("/:id", (req, res) => {
  const id = req.params.id;
  const date = new Date();
  const edits = {
    username: req.body.username,
    bio: req.body.bio,
    profileimage:
      req.files.profileimage ||
      "https://www.bing.com/images/create/a-modern-silhouette-style-gray-default-profile-ava/6552af002dfb4a3aa4349f1336fa185a?id=pyQCdxO5PnUWDQbN6ZZGXg%3D%3D&view=detailv2&idpp=genimg&form=GCRIDP&ajaxhist=0&ajaxserp=0",
    editedAt: date,
  };

  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .set(edits, { merge: true });
  collectionRef
    .then((edit) => {
      if (!id) {
        return res.status(404).json({ message: "No user to edit." });
      } else {
        return res
          .status(200)
          .send({ message: `User updated at: ${edit.writeTime}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.code });
    });
});

// GET USER

user.get("/:id", (req, res) => {
  const userId = req.params.id;
  const collectionRef = db.collection("whippers").doc(userId).get();
  collectionRef
    .then((data) => {
      if (!data.exists) {
        res.status(400).send({ message: "No user found" });
      } else {
        res.status(200).send(data.data());
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

// GET ALL USER


user.get("/", (req, res) => {
  const collectionRef = db.collection("whippers").get();
  collectionRef
    .then((snapshot) => {
      const whippers = [];
      snapshot.forEach((whipper) => {
        if (!whipper.exists) {
          res.status(400).send({ message: "No users to return" });
        } else {
          const data = whipper.data();
          data.id = whipper.id;
          whippers.push(data);
        }
      });
      res.send(whippers);
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

// FIND USERS BY CRITERIA

user.post("/find", (req, res) => {
  const username = req.body.username;

  const collectionRef = db.collection("whippers");
  const snapshot = collectionRef.where("username", "==", username).get();
  snapshot
    .then((data) => {
      data.forEach((item) => {
        if (!item.exists) {
          res.status(400).send({ message: "No user to return" });
        } else {
          res.status(200).send(item.data());
        }
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// DELETE A USER

user.delete("/:id", (req, res) => {
  const id = req.params.id;
  const collectionRef = db.collection("whippers").doc(id).delete();
  collectionRef
    .then((user) => {
      if (!id) {
        res.status(400).send({ message: "No user to delete" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(400).send({ message: error.code });
    });
});

module.exports = user;
