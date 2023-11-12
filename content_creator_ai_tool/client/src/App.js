import "./App.css";
import { useState, useEffect } from "react";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "./config"

import axios from "axios";
import Home from "./Home"
import Auth from "./Auth"

function App() {

const auth = getAuth(app)

const [token, setToken] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      console.log(obj)
      setToken(obj)
    })

  },[])


  return token === null ? <Auth /> : <Home />
}

export default App;
