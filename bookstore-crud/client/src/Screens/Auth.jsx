import React, { useInsertionEffect, useState } from "react";
import "./Auth.css";
import { app } from "../config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import books from "../assets/books.jpeg";
export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToggle, setAuthToggle] = useState(false);

  const auth = getAuth(app);

  function createUser(e) {
    e.preventDefault();
    const userReference = createUserWithEmailAndPassword(auth, email, password);
    userReference
      .then((user) => {
        if (!user.user.email === email){
          console.log("Something went wrong")
        } else {
          alert(user.user.email + " created successfully.")
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loginUser(e) {
    e.preventDefault();
    const userReference = signInWithEmailAndPassword(auth, email, password);
    userReference
      .then((user) => {
        if (!user.user.email === email){
          console.log("Something went wrong")
        } else {
          alert(user.user.email + " logged in successfully.")
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function authType(){
    setAuthToggle(prev => !prev)
  }

  return (
    <div className="auth_container">
      <img className="cover_image" src={books} alt="" />
      <form onSubmit={authToggle ?createUser: loginUser} className="auth_form">
        <h1 className="title">Unlock the secrets of the stacks!</h1>
        <h4 className="sub-title">Bookstore Inventory App</h4>
        <input
          className="auth_input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth_input"
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth_button" type="submit">{authToggle ? "Sign Up" : "Login"}</button>
        <label className="auth_label" onClick={authType} htmlFor="">{authToggle ? "Log back in" : "Create an Account"}</label>
      </form>
    </div>
  );
}
