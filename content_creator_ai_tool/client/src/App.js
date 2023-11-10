import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState([]);
  const [altText, setAltText] = useState("")

  // useEffect(() => {
  //   const request = {
  //     method: "POST",
  //     url: "http://localhost:4500/chat",
  //     // data: {
  //     //   prompt: "which fish pairs best with merlot"
  //     // }
  //   };

  //   axios(request)
  //     .then((response) => setData(response.data.choices))

  //     .catch((error) => console.log(error));
  // }, []);

  function askQuestion(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/chat",
      data: {
        prompt: question || "surprise me with a fact",
      },
    };

    axios(request)
      .then((response) => setData(response.data.choices), setQuestion(""))

      .catch((error) => console.log(error));
  }

  function imageQuestion(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/image",
      data: {
        prompt: prompt,
      },
    };
    axios(request)
      .then((data) => {
        setImage(data.data[0].url);
        setAltText(data.data[0].revised_prompt)
      })
      .catch((error) => console.log(error.code));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={askQuestion}>
          <textarea
            id="w3review"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
          <button type="submit">Ask a Question</button>
        </form>
        <>
          {data.map((item) => (
            <div key={item.id}>
              <small>{item.message.content}</small>
            </div>
          ))}
        </>
      <form onSubmit={imageQuestion}>
        <input
          type="text"
          placeholder="Image prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">New picture</button>
        <img alt={altText} style={{width: "25%"}} src={image} />
      </form>
      </header>
    </div>
  );
}

export default App;
