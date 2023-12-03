import React, { useState, useEffect } from "react";
import axios from "axios";
import TextLoading from "./TextLoading";
import Markdown from "react-markdown";
import Edits from "./Edits";
import Nav from "./Components/Nav";
import { getFirestore, setDoc, doc, addDoc } from "firebase/firestore";
import { app } from "./config";
import Database from "./Components/Database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const db = getFirestore(app);

  const auth = getAuth(app);

  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState([]);
  const [model, setModel] = useState(false);
  const [imageModel, setImageModel] = useState(false);
  const [isFinished, setIsFinished] = useState("");
  const [testTrigger, setTestTrigger] = useState("");
  const [error, setError] = useState("");
  const [responseQuestion, setResponseQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [questionId, setQuestionId] = useState(uuidv4());
  const [saveError, setSaveError] = useState();

  const [typeFormat, setTypeFormat] = useState("");

  const [toggle, setToggle] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setEmail(obj.email);
    });
  }, []);

  function askQuestion(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/chat",
      data: {
        prompt: question,
        model: model ? "gpt-4" : "gpt-3.5-turbo-1106",
        n: 1,
      },
    };

    axios(request)
      .then((response) => {
        console.log(response.data);
        const res = response.data.choices;
        setData(res);
        // console.log(res);
        setQuestion("");
        setResponseQuestion(question);

        setIsFinished(res[0].finish_reason);
      })

      .catch((error) => {
        console.log(error.code);
        console.log("Something went wrong...");
      });
  }

  function saveResponse(e) {
    e.preventDefault();
    const questionCollection = doc(
      db,
      "accounts",
      email,
      "conversations",
      uuidv4()
    );
    setDoc(questionCollection, {
      question: responseQuestion,
      response: data[0].message.content,
      id: questionId,
    })
      .then((data) => {
        console.log(data);
        setToggle(data);
      })
      .catch((error) => {
        setSaveError(error.code);
      });
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
    console.log("toggled");
  }

  function imageModelToggle() {
    setImageModel((prev) => !prev);
  }

  responseQuestion.replace(/n/, /n\n/);

  return (
    <div className="home_container">
      <div className="response_container">
        <Nav
          switchModel={modelToggle}
          type="keyboard"
          modelState={model ? "looks_3" : "looks_4"}
        />
        <div className="conversation_container">
          {isFinished === "" ? (
            <TextLoading text="." />
          ) : (
            <>
              {data.map((item) => (
                <>
                  <ul style={{ paddingTop: 60 }} key={item.id}>
                    <label className="question" htmlFor="">
                      {responseQuestion}
                    </label>
                    {typeFormat}
                    <li className="conversation_text">
                      <Markdown>{item.message.content}</Markdown>

                      {/* {item.message.content} */}
                      {error}
                    </li>
                    <button disabled={toggle === undefined ? false : true}>
                      <span
                        onClick={saveResponse}
                        class="material-symbols-outlined"
                      >
                        favorite
                      </span>
                    </button>

                    <label htmlFor="">{saveError}</label>
                  </ul>
                </>
              ))}
            </>
          )}
        </div>
      </div>
      <form className="form_container" action="">
        <input
          autoFocus
          style={{ width: "100%", fontSize: 20, padding: 6 }}
          name="question"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
        />
        <button style={{ background: "#444444" }} onClick={askQuestion}>
          <span
            style={{ background: "#444444" }}
            className="material-symbols-outlined"
          >
            send
          </span>
        </button>
      </form>
    </div>
  );
}

//
{
  /* <button>
 <span className="material-symbols-outlined">image</span>
</button>
<button>
<span className="material-symbols-outlined">edit</span>
</button> */
}
