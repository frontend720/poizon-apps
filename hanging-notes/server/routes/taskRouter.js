const express = require("express");
const taskRouter = express.Router();
const { getFirestore } = require("firebase-admin/firestore");
const app = require("../config");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const db = getFirestore(app);
taskRouter.post("/new_task", (req, res) => {
  const { task, due, priority } = req.body;
  const collectionRef = db
    .collection("users")
    .doc(uuidv4())
    .collection("tasks")
    .doc(uuidv4())
    .set({
      task: task,
      createdAt: moment().format("LLL"),
      due: due,
      taskId: uuidv4(),
      priority: priority,
    });
  collectionRef
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No task to create" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      console.log(error.code);
    });
});

taskRouter.get("/get_tasks/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const documents = [];
    const querySnapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .get();
    querySnapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error.code);
  }
});

taskRouter.delete("/delete_task/:id/:taskId", (req, res) => {
  const id = req.params.id;
  const taskId = req.params.taskId;
  const taskRef = db
    .collection("users")
    .doc(id)
    .collection("tasks")
    .doc(taskId)
    .delete();
  taskRef
    .then((task) => {
      if (!task) {
        res.status(400).send({ message: "No task to delete" });
      } else {
        res.status(200).send(task);
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

module.exports = taskRouter;
