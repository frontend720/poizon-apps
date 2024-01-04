import React, {useState, useEffect} from "react";
import { Wrapper, Container } from "./Stylesheet";
import { Link } from "react-router-dom";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import app from "./config";
import "./Account.css"


export default function Account() {
  const [userId, setUserId] = useState("")
  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user.uid)
    })
  }, [])

  const signout = (e) => {
    e.preventDefault()
    signOut(auth)
  }

  return (
    <Wrapper display="grid" columns="10% 1fr">
      <Container color="#444444">
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
        <span className="material-symbols-outlined nav_icons filled-icon">
          person
        </span>
      </Container>
      <Container color="#444444">
        <div style={{display: "flex", flexDirection: "column"}}>
    <h1>Account</h1>
      <header className="account_header"></header>
      <section className="account_section"></section>
      <footer className="account_footer">
        <p style={{cursor: "pointer"}} onClick={signout} htmlFor="">logout</p>
        <small style={{fontSize: 10}}>member ID: {userId}</small>
      </footer>
        </div>
      </Container>

    </Wrapper>
  );
}
