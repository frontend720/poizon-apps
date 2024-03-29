import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {v4 as uuidv4} from "uuid"

function App() {
  const socket = io("http://localhost:4500");
  const [input, setInput] = useState();
  const [state, setState] = useState([]);

  function newMessage(e) {
    e.preventDefault();
    socket.on("connection");
    socket.on("room", (data) => {
      setState([...state,  data]);
      setInput([...input])
      setInput("");
    });
    socket.emit("room", input);
  }
  return (
    <div style={{ padding: 32 }} className="App">
      <header
       
        className="App-header"
      >
        <form onSubmit={newMessage} style={{ display: "flex", flexDirection: "column", width: "25%" }}>

        <h2
          style={{ color: "#444444", fontWeight: "800", color: "blueviolet" }}
        >
          Broadcast a message!
        </h2>
        <textarea
          style={{
            resize: "none",
            padding: 6,
            margin: "16px 0px",
            borderRadius: 5,
          }}
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
        ></textarea>
        <button
        
          style={{
            borderRadius: 5,
            border: "0px",
            padding: 6,
            background: "#444444",
            color: "#e8e8e8",
          }}
          type="submit"
        >
          <label
            style={{
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontSize: 24,
              fontWeight: "900",
            }}
          >
            send
          </label>
        </button>
        </form>
        {state.length > 0 && (
          <ul style={{listStyle: "none"}}>
            {state.map((message) => (
              <li key={uuidv4()}>{message}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;
