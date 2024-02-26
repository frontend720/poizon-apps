import React from "react";
import "./Edit.css";

export default function Edit({
  bookId,
  title,
  description,
  genre,
  location,
  price,
  submit,
  titleChange,
  descriptionChange,
  genreChange,
  locationChange,
  priceChange,
  styleProps,
  editTitleText,
  editAuthorText,
  editDescriptionText,
  author,
  authorChange
}) {

console.log(styleProps)

  return (
    <div className="edit_form_container"  style={styleProps}>
      <form action="" className="edit_form" key={bookId} onSubmit={submit}>
        <input placeholder={editTitleText} className="edit_inputs" value={title} onChange={titleChange} name="title" type="text" />
        <input placeholder={editAuthorText} className="edit_inputs" value={author} onChange={authorChange} name="title" type="text" />
        <textarea
          name="desription"
          value={description}
          id=""
          cols="30"
          rows="5"
          onChange={descriptionChange}
          className="edit_inputs"
          placeholder={editDescriptionText}
        ></textarea>
        <input placeholder="Genre" className="edit_inputs" onChange={genreChange} value={genre} name="genre" type="text" />
        <input placeholder="Location" className="edit_inputs" onChange={locationChange} value={location} name="location" type="text" />
        <input placeholder="Price Change" className="edit_inputs" onChange={priceChange} value={price} name="quantity" type="number" />
        <button className="edit_button">Submit Edit</button>
      </form>
    </div>
  );
}
