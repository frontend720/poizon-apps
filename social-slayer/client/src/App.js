import {useEffect, useState} from "react"
import Homepage from "./Homepage";
import Assistant from "./Assistant";
import "./App.css";
import Messages from "./Messages";
import Account from "./Account";
import { Route, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import app from "./config";
import {getAuth, onAuthStateChanged} from "firebase/auth"

function App() {


  const auth = getAuth(app)
  const [authObj, setAuthObj] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj)
    })
  },[])




  return (
    <>
    {
      authObj === null ? <Authentication /> : 
      <Routes>
      <Route path="/assistant" element={<Assistant />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/account" element={<Account />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
    
  }
  </>
  );
}

export default App;
