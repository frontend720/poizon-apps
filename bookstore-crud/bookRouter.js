const express = require("express");
const admin = require("firebase-admin");
const bookRouter = express.Router();
const app = require("./config");
const { v4: uuid } = require("uuid");

const db = admin.firestore(app);

// Add new book to database

bookRouter.post("/", (req, res) => {
  const book_id = uuid();

  const data = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    u_isbn: req.body.u_isbn || uuid(),
    genre: req.body.genre,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    isHardCover: req.body.isHardCover || true,
    image: req.body.image || false,
    book_id: book_id,
  };
  const bookReference = db
    .collection("store")
    .doc(req.body.bookstore.replace(" ", "_"))
    .collection("book")
    .doc(book_id)
    .set(data);

  bookReference
    .then((book) => {
      if (!book) {
        res.status(400).send({
          message: "Could not create book reference, check data and try again.",
        });
      } else {
        res.status(200).send(book);
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

// Retrieve all books in database

bookRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  const collections = [];
  const collectionRef = db.collection("store").doc(id).collection("book").get();
  collectionRef
    .then((books) => {
      books.forEach((book) => {
        if (!book.exists) {
          res
            .status(400)
            .send({ message: "Can't retrieve book inventory. Try again." });
        } else {
          collections.push(book.data());
        }
      });
      res.status(200).send(collections);
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

// Retrieve a book in the database

bookRouter.get("/:id/:book_id", (req, res) => {
  const id = req.params.id;
  const book_id = req.params.book_id;
  const bookReference = db
    .collection("store")
    .doc(id)
    .collection("book")
    .doc(book_id)
    .get();
  bookReference
    .then((book) => {
      if (!book.exists) {
        res.status(400).send({ message: "Can't retrieve book. Try again." });
      } else {
        res.status(200).send(book.data());
      }
    })
    .catch((error) => {
      res.status(error.code);
    });
});

// Update a book in the database

bookRouter.put("/:id/:book_id", (req, res) => {
  const id = req.params.id;
  const book_id = req.params.book_id;
  const data = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    genre: req.body.genre,
    quantity: req.body.quantity,
    price: req.body.price,
    location: req.body.location,
    isHardCover: req.body.isHardCover || true,
  };
  const bookReference = db
    .collection("store")
    .doc(id)
    .collection("book")
    .doc(book_id)
    .set(data, { merge: true });

  bookReference
    .then((book) => {
      if (!book) {
        res.status(400).send({ message: "Book not found." });
      } else {
        res.status(200).send(book);
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

// Delete a book in the database

bookRouter.delete("/:id/:book_id", (req, res) => {
  const id = req.params.id;
  const book_id = req.params.book_id;
  const bookReference = db
    .collection("store")
    .doc(id)
    .collection("book")
    .doc(book_id)
    .delete();
  bookReference
    .then((book) => {
      if (!book) {
        res.status(400).send({ message: "Book not found. Try again." });
      } else {
        res.status(200).send(book);
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

module.exports = bookRouter;
