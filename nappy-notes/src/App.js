import {useState, useEffect} from "react"
import './App.css';
import {v4 as uuid} from "uuid"
import Home from './Pages/Home';
import Authentication from "./Pages/Authentication"
import {getAuth, onAuthStateChanged} from "firebase/auth"
import { app } from './config';

function App() {

const auth = getAuth(app)

const [authState, setAuthState] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      setAuthState(user)
    })
  })
 
  return (
    <>
    {authState !== null ? <Home /> :  <Authentication />
    
    
    }
    </>
  );
}

export default App;
