import React, { useState } from "react";
import AuthForm from "./Components/AuthForm";
import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")



  const data = [
    {
      id: 0,
      point: "This is an experimental project by frontend720",
      bold: true,
    },
    {
      id: 1,
      point:
        "Generate creative text formats, like poems, code, scripts, musical pieces, emails + letters.",
    },
    {
      id: 2,
      point:
        "Answer your questions in an informative way, even if they are open ended, challenging, or strange.",
      bold: true,
    },
    { id: 3, point: "Generate AI images.", bold: true },
  ];

  const signup = (e) => {
    e.preventDefault()
    const userRef = createUserWithEmailAndPassword(auth, email, password);
    userRef
      .then((data) => {
        console.log(data.user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code)
      });
  };

  const login = (e) => {
    e.preventDefault()
    const userRef = signInWithEmailAndPassword(auth, email, password)
    userRef.then((user) => {

    })
  }

  return (
    <div className="auth_container">
      <section className="auth_panel">
        <h1 className="app_title">Project Jah</h1>
        <ul style={{ listStyle: "inherit", padding: 32 }}>
          {data.map((point) => (
            <li
              style={
                point.bold ? { fontWeight: "bold" } : { fontWeight: "400" }
              }
              className="point_item"
              key={point.id}
            >
              {point.point}
            </li>
          ))}
        </ul>
      </section>
      <AuthForm
        authType="Sign Up here"
        email={email}
        password={password}
        emailChange={(e) => setEmail(e.target.value)}
        passwordChange={(e) => setPassword(e.target.value)}
        btnText="Signup"
        submit={signup}
        error={error}
      />
    </div>
  );
}
