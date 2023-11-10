import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState([]);
  const [altText, setAltText] = useState("");
  const [model, setModel] = useState(false);
  const [numberToReturn, setNumberToReturn] = useState(3);
  const [isFinished, setIsFinished] = useState("")

  function askQuestion(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/chat",
      data: {
        prompt: question || "make up a bogus feel fact",
        model: model ? "gpt-4" : "gpt-3.5-turbo",
        n: question === "" ? 1 : numberToReturn,
      },
    };

    axios(request)
      .then((response) => {
        const res = response.data.choices
        setData(res);
        console.log(res)
        setQuestion("")
        setIsFinished(res.finish_reason[0])
    
    })

      .catch((error) => console.log(error.code));
  }

  function saveResponse(e) {
    e.preventDefault();
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
        setAltText(data.data[0].revised_prompt);
      })
      .catch((error) => console.log(error.code));
  }

  function modelToggle() {
    setModel((prev) => !prev);
  }

  return (
    <div>
      <form onSubmit={askQuestion}>
        <textarea
          id="w3review"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
        <button onClick={modelToggle}>
          use {!model ? "gpt-4" : "gpt-3.5-turbo"}
        </button>
        <button type="submit">Ask a Question</button>
      </form>
      <>
        {data.map((item) => (
          <ul key={item.id}>
            <li>{item.message.content}</li>
            {item.finish_reason}
          </ul>
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
      </form>
      <h1>{isFinished}</h1>
      <img alt={altText} style={{ width: "25%" }} src={image} />
    </div>
  );
}
