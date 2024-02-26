import React, { useState, useEffect } from "react";
import { app } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Library.css";
import axios from "axios";
import Edit from "./Edit";

export default function Library({
  title,
  description,
  genre,
  location,
  price,
  quantity,
  book_id,
  trash,
  deleteItem,
  editButton
}) {
  const [request, setRequest] = useState();
  const [authObj, setAuthObj] = useState();

  const auth = getAuth(app);

  console.log(trash);

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj.email);
    });
  }, []);
  function deleteBook(e) {
    e.preventDefault();
    axios({
      url: `${process.env.REACT_APP_PORT}/${authObj}/${trash}`,
      method: "delete",
      data: {
        book_id: trash,
      },
    })
      .then((data) => {
        console.log(data.status);
        setRequest(data.status);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div
        style={request === undefined ? { display: "block" } : { display: "none" }}
        className="card"
      >
        <div className="segment">
          <span className="material-symbols-outlined icon">book_5</span>
          <label className="card-title">{title}</label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">description</span>
          <label htmlFor="" className="description">
            {description}
          </label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">label</span>
          <label htmlFor="" className="label">
            {genre}
          </label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">place</span>
          <label htmlFor="" className="location">
            {location}
          </label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">attach_money</span>
          <label htmlFor="" className="price">
            {price}
          </label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">list</span>
          <label htmlFor="" className="quantity">
            {quantity}
          </label>
        </div>
        <div style={{ width: "100%", margin: '12 "auto"' }}>
          <h2 className="barcode">{book_id}</h2>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>

        <button
          onClick={deleteBook}
          type="submit"
          //   onClick={deleteItem}

          className="material-symbols-outlined delete-button"
          value={trash}
        >
          delete
        </button>
        <button onClick={editButton}  className="material-symbols-outlined edit-button">edit</button>
        </div>
      </div>
    </div>
  );
}
