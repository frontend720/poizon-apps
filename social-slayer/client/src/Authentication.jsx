import React, { useState } from "react";
import "./Authentication.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "./config";

export default function Authentication() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isVisible, setIsVisible] = useState(false)

  const [authToggle, setAuthToggle] = useState(true);


  const googleAuth = (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()
    const reference = signInWithPopup(auth, provider)
    reference.then((user) => {
      const credential = GoogleAuthProvider.credentialFromResult(user)
      if(!user){
        console.log("No account to access")
      }else{
        console.log(user.user + credential.signInMethod)
      }
    }).catch((error) => {
      console.log(error.code)
    })
  }

  const signup = (e) => {
    e.preventDefault();
    const authReference = createUserWithEmailAndPassword(auth, email, password);
    authReference
      .then((user) => {
        if (!email && !password) {
          setError("User must enter email and password");
        } else {
          console.log(user.providerId);
        }
      })
      .catch((error) => {
        setServerError(error.code);
        console.log(error.code);
      });
  };

  const login = (e) => {
    e.preventDefault();
    const authReference = signInWithEmailAndPassword(auth, email, password);
    authReference
      .then((user) => {
        if (!email && !password) {
          setError("User must enter email and password");
        } else {
          console.log(user.providerId);
        }
      })
      .catch((error) => {
        setServerError(error.code);
        console.log(error.code);
      });
  };

  const toggle = () => {
    setAuthToggle((prev) => !prev);
  };

  const visibilityToggle = () => {
    setIsVisible(prev => !prev);
  }

  return (
    <div>
      <form
        className="auth_form"
        onSubmit={authToggle ? signup : login}
        action=""
      >
        <div className="flex">
          <span className="material-symbols-outlined">mail</span>
          <input
            placeholder="email"
            className="auth_inputs"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex">
          <span className="material-symbols-outlined">lock</span>
          <input
            placeholder="password"
            className="auth_inputs"
            type={isVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span onClick={visibilityToggle} style={{marginLeft: 6}} class="material-symbols-outlined">{isVisible ? "visibility_off" : "visibility"}</span>
        </div>
        {/* <label style={{textAlign: "center", color: "orangered"}} htmlFor="">{error ==  `auth/missing-password` || `auth/missing-email` ? "Email and Password must be provided" : ""}</label> */}
        <label style={{ textAlign: "center", color: "orangered" }} htmlFor="">
          {serverError === "auth/email-already-in-use"
            ? "Email is already in use"
            : ""}
        </label>
        <button className="auth_button" type="submit">
          continue
        </button>
        <p onClick={toggle} htmlFor="">
          {authToggle ? "Already a member" : "Signup here"}
        </p>
        <h2
          style={{ fontWeight: 400, textAlign: "center", margin: "24px 0px" }}
          htmlFor=""
        >
          or
        </h2>
        <button onClick={googleAuth} className="google_btn">continue with google</button>
      </form>
    </div>
  );
}
