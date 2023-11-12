import React, { useState } from "react";
import axios from "axios";
import TextLoading from "./TextLoading";
import Markdown from "react-markdown";

export default function Home() {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState([]);
  const [altText, setAltText] = useState("");
  const [model, setModel] = useState(false);
  const [imageModel, setImageModel] = useState(false);
  const [numberToReturn, setNumberToReturn] = useState(1);
  const [isFinished, setIsFinished] = useState("");
  const [testTrigger, setTestTrigger] = useState("");
  const [error, setError] = useState("");

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
        console.log(response.data);
        const res = response.data.choices;
        setData(res);
        // console.log(res);
        setQuestion("");
        setIsFinished(res[0].finish_reason);
      })

      .catch((error) => {
        console.log(error.code);
        setError("Something went wrong...");
      });
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
        model: !imageModel ? "dall-e-3" : "dall-e-2",
        n: !imageModel ? 1 : 3,
      },
    };
    axios(request)
      .then((data) => {
        setImage(data.data);
        console.log(data.data[0].revised_prompt);
        console.log(data.data);
        console.log(data);
        setTestTrigger(data.data[0].url);
        setPrompt("");
      })
      .catch((error) => console.log(error.code));
  }

  function modelToggle() {
    setModel((prev) => !prev);
  }

  function imageModelToggle() {
    setImageModel((prev) => !prev);
  }

  return (
    <div className="container">
      <div>
        <button onClick={modelToggle}>
          Switch to {!model ? "GPT-4" : "GPT-3.5-turbo"}
        </button>
        <form className="text_form" onSubmit={askQuestion}>
          <div className="spacer"></div>
          <textarea
            className="text_input"
            id="w3review"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Text prompt..."
          ></textarea>
          <div className="spacer"></div>
          <button className="submit_btn" type="submit">
            <label className="btn_text" htmlFor="">
              Ask a Question
            </label>
          </button>
        </form>

        <form className="text_form" onSubmit={imageQuestion}>
          <textarea
            type="text"
            placeholder="Image prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            //   disabled
            className="text_input"
          ></textarea>
          <div className="spacer"></div>
          <button className="submit_btn" type="submit">
            <label htmlFor="" className="btn_text">
              Generate new image
            </label>
          </button>
          {/* <div className="spacer"></div> */}
        </form>
        {/* <button onClick={imageModelToggle}>
          Switch to {imageModel ? "DALL-E-3" : "DALL-E-2"}
        </button> */}
        <h1>{isFinished}</h1>
      </div>
      <section className="response">
        <header style={{ marginBottom: 20 }}>
          <h1>Conversation</h1>
        </header>
        <div className="conversation_container">
          {isFinished === "" ? (
            <TextLoading text="Enter text in text prompt to begin generating responses..." />
          ) : (
            <>
              {data.map((item) => (
                <ul key={item.id}>
                  <li className="conversation_text">
                    <Markdown>{item.message.content}</Markdown>
                    {/* {item.message.content} */}
                    {error}
                  </li>
                </ul>
              ))}
            </>
          )}
        </div>
        <section>
          <div className="image_container">
            {testTrigger === "" ? (
              <>
                <div
                  className="conversation_container"
                  style={{ width: "40%", position: "absolute" }}
                >
                  <TextLoading text="Enter text in image prompt to begin generating a scene..." />
                </div>
              </>
            ) : (
              <>
                {image.map((i) => (
                  <>
                    <div key={i.url}>
                      <div>
                        <img src={i.url} alt="" />
                        <small className="summary">{i.revised_prompt}</small>
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
