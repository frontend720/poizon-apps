import React, { useEffect, useState } from "react";
import Nav from "./Components/Nav";
import "./AccountStyles.css";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./config";
import AccountForm from "./Components/AccountForm"

export default function Account() {
  const auth = getAuth(app);

  const [userEmail, setUserEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setUserEmail(obj.email);
      setCreatedAt(obj.metadata.creationTime);
    });
  }, []);

  function leave(e){
    e.preventDefault()
    signOut(auth).then((user) => {
      console.log(user)
    }).catch((error) => console.log(error))
  }

const formToggle = (e) => {
  e.preventDefault()
  setToggle(prev => !prev)
}

  return (
    <div>
      <Nav />
      <div className="account_container">
        <div className="account_header">
          <div>
        <label htmlFor="">{userEmail}</label>
        <h2>Account</h2>
          </div>
          <span onClick={formToggle} style={{fontSize: 12}} class="material-symbols-outlined">{toggle ? "remove" : "add_circle"}</span>
        </div>
        <AccountForm view={toggle ? {display: "block"} : {display: "none"}} />
        <div className="footer">
          <button onClick={leave} className="signout">
            <span style={{fontSize: 12}} class="material-symbols-outlined">logout</span>
            <label style={{fontSize: 20}}>Leave</label>
          </button>
          <small style={{textAlign: "right"}} htmlFor="">{createdAt}</small>
        </div>
      </div>
    </div>
  );
}
