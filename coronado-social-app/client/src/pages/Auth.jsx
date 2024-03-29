import React from "react";
import { Button, Wrapper, AuthInput } from "../../StyleSheet";
import app from "../config";
import "./Auth.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import googleIcon from "../google.svg";

export default function Auth() {
  const auth = getAuth(app);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [toggle, setToggle] = React.useState(true);

  function newUser(e) {
    e.preventDefault();
    const user = createUserWithEmailAndPassword(auth, email, password);
    user
      .then((data) => {
        console.log(data.user);
      })
      .catch((error) => console.log(error.code));
  }

  function returningUser(e) {
    e.preventDefault();
    const user = signInWithEmailAndPassword(auth, email, password);
    user
      .then((data) => {
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error.code);
      });
  }

  const authToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <Wrapper color="#9e579d">
      <form
        onSubmit={toggle ? newUser : returningUser}
        action=""
        style={{ width: "100%", marginTop: 40 }}
      >
        <Button
          color="#40514e"
          disabled
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            borderRadius: 5,
            marginBottom: 24,
          }}
        >
          <span
            style={{ fontSize: 26, paddingRight: 16 }}
            className="material-symbols-outlined pet"
          >
            mail
          </span>
          <label htmlFor="">{toggle ? "sign up" : "log in"} with email</label>
        </Button>
        <AuthInput
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <AuthInput
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
        />
        <Button style={{ borderRadius: 5 }}>{toggle ? "Signup" : "Login"}</Button>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "900",
            color: "#ffffff",
            marginBottom: 24,
          }}
        >
          OR
        </h1>
        <Button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            width: "100%",
            borderRadius: 5,
          }}
        >
          <img
            style={{ width: 40, paddingRight: 16 }}
            src={googleIcon}
            alt=""
          />
          continue with Google
        </Button>
        <label onClick={authToggle} style={{textAlign: "right"}} htmlFor="">{toggle ? "Login" : "Signup"}</label>
      </form>
    </Wrapper>
  );
}
