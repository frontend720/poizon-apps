import "./App.css";
import Welcome from "./Pages/Welcome";

import {useState} from "react"

function App() {

  const [str1, setStr1] = useState("")
  const [str2, setStr2] = useState("")

  console.log(str1 === str2)

  return (
    <div className="App">
      <input name="str1" value={str1} onChange={(e) => setStr1(e.target.value)} />
      <input name="str2" value={str2} onChange={(e) => setStr2(e.target.value)} />
      <Welcome />
    </div>
  );
}

export default App;
