const express = require("express");
const posts = express.Router();
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const { app } = require("../config");


const db = admin.firestore(app);

// POST

posts.post("/:whipperId", (req, res) => {
  const id = req.params.whipperId;
  const flowId = uuidv4()
  const postData = {
    prompt: req.body.prompt,
    image: req.body.image,
    summary: req.body.summary,
    postId: flowId,
    likes: req.body.likes || 0,
    comments: null,
  };

  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .collection("flows")
    .doc(flowId)
    .set(postData);
  collectionRef
    .then((data) => {
      if (!postData) {
        res.status(500).send({ message: "All required data must be provided" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

// GET ALL POSTS

posts.get("/:id", (req, res) => {
  const id = req.params.id;
  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .collection("flows")
    .get();
  collectionRef
    .then((snapshost) => {
      const flows = [];
      snapshost.forEach((flow) => {
        if (!flow.exists) {
          res
            .status(404)
            .send({ message: "no flows right now, check back later." });
        } else {
          const data = flow.data();
          data.id = flow.id;
          flows.push(data);
        }
      });
      res.send(flows);
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

// GET A POST

posts.get("/:id/:flowId", (req, res) => {
  const id = req.params.id;
  const flowId = req.params.flowId;
  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .collection("flows")
    .doc(flowId)
    .get();
  collectionRef
    .then((doc) => {
      if (!doc.exists) {
        res.status(400).send({ message: "Flow does not exist" });
      } else {
        res.status(200).send(doc.data());
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.code });
    });
});

posts.delete("/:id/:flowId", (req, res) => {
  const id = req.params.id;
  const flowId = req.params.flowId;
  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .collection("flows")
    .doc(flowId)
    .delete();
  collectionRef
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No flow to delete" });
      } else {
        res
          .status(200)
          .send({ message: "Flow delete succesfull" + data.isEqual() });
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

module.exports = posts;
