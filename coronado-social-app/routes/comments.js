const express = require("express");
const comments = express.Router();
const { v4: uuidv4 } = require("uuid");
const { app } = require("../config");
const admin = require("firebase-admin");

const db = admin.firestore(app);

comments.post("/:id/:flowId", (req, res) => {
  const data = {
    comment: req.body.comment,
    timestamp: Date(),
    username: req.body.username,
  };
  const collectionRef = db
    .collection("whippers")
    .doc(req.params.id)
    .collection("flows")
    .doc(req.params.flowId)
    .collection("comments")
    .doc(uuidv4())
    .set(data);

  collectionRef
    .then((comment) => {
      if (!data) {
        res.status(400).send({ message: "No comment to post" });
      } else {
        res.status(200).send(comment);
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: error.code });
    });
});

comments.put("/:id/:flowId/:commentId", (req, res) => {
  const id = req.params.id;
  const flowId = req.params.flowId;
  const commentId = req.params.commentId;

  const data = { comment: req.body.comment };

  const collectionRef = db
    .collection("whippers")
    .doc(id)
    .collection("flows")
    .doc(flowId)
    .collection("comments")
    .doc(commentId)
    .set(data, { merge: true });

  collectionRef
    .then((edit) => {
      if (!data) {
        res.status(400).send({ message: "No comment to edit" });
      } else {
        res.status(200).send(edit);
      }
    })
    .catch((error) => {
      return res.status(error).send({ message: error.code });
    });
});

module.exports = comments;
