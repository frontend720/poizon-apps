import "./App.css";
import { useEffect, useState } from "react";
import { app } from "./config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Auth from "./Screens/Auth";
import Homescreen from "./Screens/Homescreen";

function App() {
  const auth = getAuth(app);
  const [authObj, setAuthObj] = useState();

  onAuthStateChanged(auth, (obj) => {
    setAuthObj(obj);
  });

  return (
    <div className="App">
      {authObj === null ? (
        <header className="App-header">
          <Auth />
        </header>
      ) : (
        <Homescreen />
      )}
    </div>
  );
}

export default App;
