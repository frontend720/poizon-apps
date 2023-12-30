import React, {useState} from "react";
import "./Authentication.css";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import app from "./config";

export default function Authentication() {

  const auth = getAuth(app)

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const [serverError, setServerError] = useState("")

const signup = (e) => {
  e.preventDefault()
  const authReference = createUserWithEmailAndPassword(auth, email, password)
  authReference.then((user) => {
    if (!email && !password) {
      setError("User must enter email and password")
    } else {
      console.log(user.providerId)
    }
  }).catch((error) => {
    setServerError(error.code)
    console.log(error.code)
  })
}

  return (
    <div>
      <form className="auth_form" onSubmit={signup} action="">
        <div className="flex">
          <span className="material-symbols-outlined">mail</span>
          <input placeholder="email" className="auth_inputs" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex">
          <span className="material-symbols-outlined">lock</span>
          <input placeholder="password" className="auth_inputs" type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      {/* <label style={{textAlign: "center", color: "orangered"}} htmlFor="">{error ==  `auth/missing-password` || `auth/missing-email` ? "Email and Password must be provided" : ""}</label> */}
      <label style={{textAlign: "center", color: "orangered"}} htmlFor="">{serverError === "auth/email-already-in-use" ? "Email is already in use" : ""}</label>
        <button className="auth_button" type="submit">continue</button>
        <h2 style={{fontWeight: 400, textAlign: "center", margin: "24px 0px"}} htmlFor="">or</h2>
        <button className="google_btn">
            continue with google
        </button>
      </form>
    </div>
  );
}
