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
import moment from "moment";
import remarkGfm from "remark-gfm";

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

  const [userId, setUserId] = useState();
  // const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [toggle, setToggle] = useState(true);
  const [searchToggle, setSearchToggle] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [saveResponse, setSaveResponse] = React.useState(response);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingBarWidth, setLoadingBarWidth] = useState(100);

  const [typeFormat, setTypeFormat] = useState("");

  // const [toggle, setToggle] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setEmail(obj.email);
    });
  }, []);

  // function askQuestion(e) {
  //   e.preventDefault();
  //   const request = {
  //     method: "POST",
  //     url: "http://localhost:4500/chat",
  //     data: {
  //       prompt: question,
  //       model: model ? "gpt-4" : "gpt-3.5-turbo-1106",
  //       n: 1,
  //     },
  //   };

  //   axios(request)
  //     .then((response) => {
  //       console.log(response.data[0].message);

  //       setQuestion("");
  //       setResponseQuestion(response.data);
  //       setData(response.data[0])

  //       // setIsFinished(res[0].finish_reason);
  //     })

  //     .catch((error) => {
  //       console.log(error.code);
  //       console.log("Something went wrong...");
  //     });
  // }

  const askQuestion = (e) => {
    e.preventDefault();
    const botName = "Gage";
    const tone = " expressive";
    const systime = moment().format("MMMM Do YYYY, h:mm a");

    const request = {
      method: "POST",
      url: `https://3039-64-44-87-20.ngrok-free.app/chat`,
      data: {
        prompt: response.map((r) => r) + question,
        bot_name: botName,
        tone: "friendly",

        userId,
        systime,
      },
    };

    const elipse = "...";

    axios(request)
      .then((res) => {
        const messageContent = res.data[0].message.content;
        setResponse((prev) => [
          ...prev,
          question.slice(0, 120).concat(question.length > 120 ? elipse : ""),
          messageContent,
        ]);

        setQuestions((prev) => [...prev, question]);
        setToggle((prev) => !prev);
        setSearchToggle();
        // setDisclaimer("");

        setIsAnimating((prev) => !prev);
        setLoadingBarWidth(0); //
        return res.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
    setQuestion("");
    setIsAnimating(true);
  };

  // function saveResponse(e) {
  //   e.preventDefault();
  //   const questionCollection = doc( 
  //     db,
  //     "accounts",
  //     email,
  //     "conversations",
  //     uuidv4()
  //   );
  //   setDoc(questionCollection, {
  //     question: responseQuestion,
  //     response: data[0].message.content,
  //     id: questionId,
  //   })
  //     .then((data) => {
  //       console.log(data);
  //       setToggle(data);
  //     })
  //     .catch((error) => {
  //       setSaveError(error.code);
  //     });
  // }

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

  console.log(response.map((r) => r));

  function modelToggle() {
    setModel((prev) => !prev);
    console.log("toggled");
  }

  function imageModelToggle() {
    setImageModel((prev) => !prev);
  }

  // data.replace(/n/, /n\n/);

  return (
    <div className="home_container">
      <div className="response_container">
        <Nav
          switchModel={modelToggle}
          type="keyboard"
          modelState={model ? "looks_3" : "looks_4"}
        />
        <div className="conversation_container">
          <>
            {response.map((item) => (
              <>
                {/* <ul style={{ paddingTop: 60 }} key={item.id}>
                    <label className="question" htmlFor="">
                      {responseQuestion}
                    </label>
                    {typeFormat} */}

                <Markdown  remarkPlugins={remarkGfm}>{item.message.content}</Markdown>
                {/* 
                      {item.message.content}
                      {error}
                   
                    <button disabled={toggle === undefined ? false : true}>
                      <span
                        onClick={saveResponse}
                        class="material-symbols-outlined"
                      >
                        favorite
                      </span>
                    </button>

                    <label htmlFor="">{saveError}</label>
                  </ul> */}
              </>
            ))}
          </>
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
