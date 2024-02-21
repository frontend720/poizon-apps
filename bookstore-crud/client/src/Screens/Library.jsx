import React, { useState, useEffect } from "react";
import { app } from "../config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Library.css";
import axios from "axios";

export default function Library({
  title,
  description,
  genre,
  location,
  price,
  quantity,
  book_id,
  trash,
}) {
  const [request, setRequest] = useState();
  const [authObj, setAuthObj] = useState();

  const auth = getAuth(app);

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
        console.log(data);
        setRequest(data);
      })
      .catch((error) => console.log(error));
  }

  console.log(trash);

  return (
    <div>
      <div className="card">
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
        <button
          onClick={deleteBook}
          type="button"
          className="material-symbols-outlined delete-button"
          value={trash}
        >
          delete
        </button>
      </div>
    </div>
  );
}
