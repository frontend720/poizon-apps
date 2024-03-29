const admin = require("firebase-admin");
const moment = require("moment");
const express = require("express");
const todoRouter = express.Router();
const { v4: uuidv4 } = require("uuid");
const app = require("../config");

console.log(app);

const db = admin.firestore(app);

todoRouter.post("/create_todo", (req, res) => {
  const todoId = uuidv4()
  const todoRef = db
    .collection("accounts")
    .doc("frontend720@gmail.com")
    .collection("todos")
    .doc(todoId)
    .set({
      subject: req.body.subject,
      todo: req.body.todo,
      noteId: todoId,
      done: false,
      createdAt: moment().format("MMMM Do YYYY, h:mm a"),
    });
  todoRef
    .then((todo) => {
      if (!req.body.subject && !req.body.todo) {
        res.status(400).send({ message: "Subject and Todo cannot be empty" });
      } else {
        res
          .status(200)
          .send({ message: "Todo created in " + todo.writeTime + "ms" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

todoRouter.get("/get_todos/:userId", (req, res) => {
  const userId = req.params.userId;
  const todoArr = []
  const todoRefs = db
    .collection("accounts")
    .doc(userId)
    .collection("todos")
    .get();
  todoRefs
    .then((todos) => {
      todos.forEach((todo) => {
        if (!todo) {
          res.status(400).send({ message: "No user todos found" });
        } else {
          todoArr.push(todo.data())
        }
      });
      if(todoArr.length > 0){
        res.status(200).send(todoArr)
      }else{
        res.status(400).send({message: "No user todos found"})
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

todoRouter.get("/get_todo/:userId/:todoId", (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const todoRef = db
    .collection("accounts")
    .doc(userId)
    .collection("todos")
    .doc(todoId)
    .get();
  todoRef
    .then((todo) => {
      if (!userId) {
        res.status(400).send({ message: "No todo found." });
      } else {
        res.status(200).send(todo.data());
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

todoRouter.put("/edit_todo/:userId/:todoId", (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const todoRef = db
    .collection("accounts")
    .doc(userId)
    .collection("todos")
    .doc(todoId)
    .update(
      {
        subject: req.body.subject,
        todo: req.body.todo,
        noteId: noteId,
        done: req.body.done,
        editedAt: moment().format("MMMM Do YYYY, h:mm a"),
      },
      { merge: true }
    );
  todoRef.then((todo) => {
    if (!req.body.subject && !req.body.todo) {
      res.status(400).send({ message: "Subject and Todo cannot be empty" });
    } else {
      res
        .status(200)
        .send({ message: "Todo updated in " + todo.writeTime + "ms" });
    }
  });
});

todoRouter.delete("/delete_todo/:userId/:todoId", (req, res) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  const todoRef = db
    .collection("accounts")
    .doc(userId)
    .collection("todos")
    .doc(todoId)
    .delete();
  todoRef
    .then((todo) => {
      if (!todoId) {
        res.status(400).send({ message: "No user ID or todo Id provided." });
      } else {
        res
          .status(200)
          .send({
            message: "deleted successfully in " + todo.writeTime() + "ms",
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err.code);
    });
});

module.exports = todoRouter;
