import { useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeContext } from "./themeContext";

function App() {
  const { iterate, addNumber } = useContext(ThemeContext);

  console.log(iterate);
  return (
    <div className="App">
      <header>
        {iterate}
        <button onClick={addNumber}>add number</button>
      </header>
    </div>
  );
}

export default App;
