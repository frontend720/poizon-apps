import React, { useState } from "react";
import AuthForm from "./Components/AuthForm";
import { app } from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [toggle, setToggle] = useState(false);

  const signup = (e) => {
    e.preventDefault();
    const userRef = createUserWithEmailAndPassword(auth, email, password);
    userRef
      .then((data) => {
        console.log(data.user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code);
      });
  };

  const login = (e) => {
    e.preventDefault();
    const userRef = signInWithEmailAndPassword(auth, email, password);
    userRef.then((user) => {
      console.log(user.user);
      setEmail("");
      setPassword("");
    });
  };

  const authToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="auth_container">
      {toggle ? (
        <>
          <AuthForm
            authType="Welcome Back"
            email={email}
            password={password}
            emailChange={(e) => setEmail(e.target.value)}
            passwordChange={(e) => setPassword(e.target.value)}
            btnText="Login"
            submit={login}
            error={error}
            toggle={authToggle}
            toggleText="Signup Here"
          />
        </>
      ) : (
        <>
          <AuthForm
            authType="New Here"
            email={email}
            password={password}
            emailChange={(e) => setEmail(e.target.value)}
            passwordChange={(e) => setPassword(e.target.value)}
            btnText="Signup"
            submit={signup}
            error={error}
            toggle={authToggle}
            toggleText="Login Here"
          />
        </>
      )}
    </div>
  );
}
