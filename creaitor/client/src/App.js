import "./App.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { app } from "./config";

import axios from "axios";
import Home from "./Home";
import Auth from "./Auth";
import Account from "./Account";
import Create from "./Create";
import Nav from "./Components/Nav";
import Note from "./Note";

function App() {
  const auth = getAuth(app);

  const [token, setToken] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setToken(obj);
    });
  }, []);

  return token === null ? (
    <Auth />
  ) : (
    <>
      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route path="/write" element={<Home />} />
        <Route path="/artist" element={<Create />} />
        <Route path="/saved" element={<Note />} />
      </Routes>
    </>
  );
}

export default App;
