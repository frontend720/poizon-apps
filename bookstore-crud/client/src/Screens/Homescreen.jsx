import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../config";
import axios from "axios";
import "./Homescreen.css";

export default function Homescreen() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [authObj, setAuthObj] = useState("");
  const [request, setRequest] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthObj(user.email);
    });
  });

  // console.log(JSON.stringify(authObj));

  function addTitle(e) {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_PORT}`,
      method: "post",
      data: {
        title: title,
        author: author,
        description: description,
        genre: genre,
        quantity: quantity,
        price: price,
        location: location,
        bookstore: authObj,
      },
    })
      .then((data) => {
        console.log(data);
        setRequest(data);
      })
      .catch((error) => console.log(error));
  }

  function getInventory() {
    const booksArr = [];
    const querySnapshot = getDocs(
      collection(db, "store", authObj.toString(), "book")
    );
    querySnapshot
      .then((book) => {
        book.forEach((b) => {
          // console.log(b.data());
          booksArr.push(b.data());
        });
        console.log(booksArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (!authObj) {
      return;
    } else {
      getInventory();
    }
  }, [request]);

  return (
    <div>
      <form className="entry_form" onSubmit={addTitle} action="">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="entry_inputs"
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="entry_inputs"
        />
        <textarea
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="entry_inputs textarea"
          rows={4}
        ></textarea>
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="entry_inputs"
        />
        <input
          type="text"
          placeholder="Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="entry_inputs"
        />
        <div className="entry_flex">
          <input
            style={{ width: "46%" }}
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="entry_inputs number_input_left"
          />
          <input
            style={{ width: "46%" }}
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="entry_inputs number_input_right"
          />
        </div>
        <button className="entry_button">Add Title</button>
      </form>
    </div>
  );
}
