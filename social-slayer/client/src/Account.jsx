import React, { useState, useEffect } from "react";
import { Wrapper, Container } from "./Stylesheet";
import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "./config";
import "./Account.css";

export default function Account() {
  const [userId, setUserId] = useState("");

  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user.uid);
    });
  }, []);

  const signout = (e) => {
    e.preventDefault();
    signOut(auth);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <Wrapper display="grid" columns="10% 1fr">
        <Container padding="125px 5px 0px 5px" color="#444444" style={{display: "flex", flexDirection: "column"}}>
          <Link to="/">
            <span className="material-symbols-outlined nav_icons">home</span>
          </Link>
          <Link to="/assistant">
            <span className="material-symbols-outlined nav_icons ">
              smart_toy
            </span>
          </Link>
          <Link to="/messages">
            <span className="material-symbols-outlined nav_icons">chat</span>
          </Link>
          <Link>
            <span className="material-symbols-outlined nav_icons filled-icon">
              person
            </span>
          </Link>
        </Container>
        <footer className="account_footer">
          <p style={{ cursor: "pointer" }} onClick={signout} htmlFor="">
            logout
          </p>
          <small style={{ fontSize: 10 }}>member ID: {userId}</small>
        </footer>
      </Wrapper>
    </div>
  );
}
