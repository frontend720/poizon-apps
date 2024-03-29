import React, { useState } from "react";
import AuthForm from "../Components/AuthForm";
import { auth } from "../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Welcome() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")

  const [authToggle, setAuthToggle] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  function newUser(e) {
    e.preventDefault();
    const userRef = createUserWithEmailAndPassword(
      auth,
      email,
      password,
      username
    );
    userRef
      .then((user) => {
        if (!user) {
          return;
        } else {
          console.log(user.providerId);
        }
      })
      .catch((error) => {
        setErrorMsg(error.code);
        if (error.code === "auth/weak-password") {
            setErrorMsg("Password must be at least 12 characters long")
        } else if(error.code === "auth/invalid-email") {
            setErrorMsg("Your email is not in a valid format")
        }else if(error.code === "auth/missing-password"){
            setErrorMsg("User must provide password")
        }
      });
  }

  function returningUser(e) {
    e.preventDefault();
    const userRef = signInWithEmailAndPassword(auth, email, password);
    userRef.then((user) => {
      if (!user) {
        return;
      } else {
        console.log(user.user);
      }
    }).catch((error) => {
        if (error) {
            setErrorMsg("User not found");
        } else {
            
        }
    })
  }

  const toggle = () => {
    setAuthToggle((prevToggle) => !prevToggle);
  };

  console.log(password === confirmPassword)

  return (
    <div className="welcome_wrapper">
      <AuthForm
        authText={authToggle ? "Welcome Back!" : "Hey There!"}
        submit={authToggle ? returningUser : newUser}
        email={email}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        userChange={(e) => setUsername(e.target.value)}
        emailChange={(e) => setEmail(e.target.value)}
        passwordChange={(e) => setPassword(e.target.value)}
        confirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
        btnText={authToggle ? "Login" : "Sign Up"}
        feedbackText={errorMsg}
        toggler={toggle}
        toggleText={authToggle ? "SIGN UP" : "LOG BACK IN"}
        display={authToggle ? "none" : "block"}
        isDisabled={password === confirmPassword ? false : true}
      />
      
    </div>
  );
}
