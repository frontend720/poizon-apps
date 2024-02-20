import React from "react";
import "./Library.css";

export default function Library({title, description, genre, location, price, quantity, book_id}) {
  return (
    <div>
      <div className="card">
        <div className="segment">
          <span className="material-symbols-outlined icon">book_5</span>
          <label className="card-title">{title}</label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">description</span>
          <label htmlFor="" className="description">{description}</label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">label</span>
          <label htmlFor="" className="label">{genre}</label>
        </div>
        <div className="segment">
          <span className="material-symbols-outlined icon">place</span>
          <label htmlFor="" className="location">{location}</label>
        </div>
        <div className="segment">
            <span className="material-symbols-outlined icon">attach_money</span>
            <label htmlFor="" className="price">{price}</label>
        </div>
        <div className="segment">
            <span className="material-symbols-outlined icon">list</span>
            <label htmlFor="" className="quantity">{quantity}</label>
        </div>
        <div style={{width: "100%", margin: '12 "auto"'}}>

        <small>{book_id}</small>
        </div>
      </div>
    </div>
  );
}
