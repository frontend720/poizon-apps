import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "../config";
import axios from "axios";
import "./Homescreen.css";
import Library from "./Library";
import Edit from "./Edit";

export default function Homescreen({bookid}) {
  const auth = getAuth(app);

  function logOut(e) {
    e.preventDefault();
    signOut(auth);
  }

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
  const [response, setResponse] = useState([]);
  const [id, setId] = useState();
  const [modal, setModal] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthObj(user.email);
    });
  });

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
        setTitle("");
        setDescription("");
        setLocation("");
        setQuantity("");
        setPrice("");
        setAuthor("");
        setGenre("");
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
          booksArr.push(b.data());
        });
        console.log(booksArr);
        setResponse(booksArr);
        setId(booksArr.book_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateInventory(e) {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_PORT}/${authObj.toString()}/${bookid}`,
      data: {
        title: title,
        author: author,
        description: description,
        genre: genre,
        quantity: quantity,
        price: price,
        location: location,
      },
    });
  }

  console.log(`${process.env.REACT_APP_PORT}/${authObj.toString()}`);

  function onEditButton() {
    setModal((prev) => !prev);
  }

  useEffect(() => {
    if (!authObj) {
      return;
    } else {
      getInventory();
    }
  }, [request, authObj, id]);

  return (
    <div className="grid-container">
      <button onClick={logOut} className="leave_button">
        <label htmlFor="">Leave</label>
        <span class="material-symbols-outlined">snowshoeing</span>
      </button>
      <form className="entry_form" onSubmit={addTitle} action="">
        <h1>Entry Form</h1>
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
        <button className="entry_button" type="submit">
          Add Title
        </button>
      </form>
      <div>
        {/* {response.map((item) => (
          ))} */}
        {response.sort().map((item) => (
          <div key={item.u_isbn}>
            <Edit
              styleProps={modal ? { display: "block" } : { display: "none" }}
              
              title={title}
              description={description}
              genre={genre}
              location={location}
              price={price}
              submit={updateInventory}
              titleChange={(e) => setTitle(e.target.value)}
              descriptionChange={(e) => setDescription(e.target.value)}
              genreChange={(e) => setGenre(e.target.value)}
              locationChange={(e) => setLocation(e.target.value)}
              priceChange={(e) => setPrice(e.target.value)}
              editTitleText={item.title}
              editAuthorText={item.author}
            />
            <Library
              title={item.title}
              description={item.description}
              genre={item.genre}
              location={item.location}
              quantity={item.quantity}
              price={item.price}
              book_id={item.book_id}
              trash={item.book_id}
              editButton={onEditButton}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
