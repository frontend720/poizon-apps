import React, { useState, useEffect } from "react";
import "../AccountStyles.css";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import { app } from "../config";
export default function AccountForm({view}) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setEmail(obj.email);
    });
  },[]);

  function addData(e) {
    e.preventDefault()
    const collectionRef = setDoc(doc(db, "accounts", email), {
      displayName: displayName,
      location: location,
      bio: bio,
      lastEdited: Date(),
      email: email,
    }, {merge: true});
    collectionRef
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  return (
    <div>
      <form style={view} onSubmit={addData} className="account_form" action="">
        <div className="divider">
          <label className="account_form_tags" htmlFor="">
            Display Name
          </label>
          <input
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="account_form_inputs"
            type="text"
          />
        </div>
        <div className="divider">
          <label className="account_form_tags" htmlFor="">
            Location
          </label>
          <input
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="account_form_inputs"
            type="text"
          />
        </div>
        <div className="divider">
          <label className="account_form_tags" htmlFor="">
            Bio
          </label>
          <textarea
            className="account_form_inputs textarea"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button className="account_form_submit_button" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
