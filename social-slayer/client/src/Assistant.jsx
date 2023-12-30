import React, { useEffect } from "react";
import {
  Wrapper,
  Container,
  Heading,
  InputContainer,
  Form,
  ScrollContainer,
} from "./Stylesheet";
import TextareaAutosize from "react-textarea-autosize";
import { PiBroom } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "./config";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export default function Assistant() {
  const [response, setResponse] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [questions, setQuestions] = React.useState([question]);
  const [responses, setResponses] = React.useState([response]);
  const [collectionId, setCollectionId] = React.useState(uuidv4());
  // const [toggle, setToggle] = React.useState(question);
  const [userId, setUserId] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [saveResponse, setSaveResponse] = React.useState("");

  const auth = getAuth(app);

  const title = "chucky cheese";
  const artist = "qveen herby"

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: {
        q: `${title},${artist}`,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_DEEZER_API_KEY,
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    const response = axios.request(options);
    response
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const db = getFirestore(app);

  React.useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setUserId(obj.uid);
    });
  }, []);

  const chat = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:5200/new",
      data: {
        prompt: JSON.stringify(response) + question,
        bot_name: "DeAndre",
        tone: "friendly, expressive",
        userId: userId,
        systime: moment().format("MMMM Do YYYY, h:mm a"),
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data);
        setResponse((prev) => [...prev, res.data[0].message.content]);
        setSaveResponse(res.data[0].message.content);
        setQuestion("");
        setToggle((prev) => !prev);
        const id = uuidv4();
        if (!res.data) {
          console.log("No data to save");
        } else {
          setTimeout(() => {
            save();
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setQuestions((prev) => [...prev, question]);
    setResponses((prev) => [...prev, response]);
  };

  React.useEffect(() => {
    if (responses === "") {
      save();
    }
  }, [saveResponse]);

  const save = () => {
    const request = {
      method: "POST",
      url: "http://localhost:5200/save",
      data: {
        system: response,
        user: question,
        accountId: userId,
        conversationId: uuidv4(),
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => error.code);
  };

  const resetConversation = (e) => {
    e.preventDefault();
    setResponse([]);
    setQuestions([undefined]);
    // setCollectionId()
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <Wrapper
        display="grid"
        columns="5% 2fr 25%"
        style={{ height: "20vh !important" }}
      >
        <Container width="" style={{ left: 0 }} color="#444444">
          <header
            style={{
              width: "5%",
              height: 75,
              background: "#e8e8e8",
              margin: "0px !important",
              position: "absolute",
              top: 0,
              left: 0,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#444444" }}>ai</h1>
          </header>
          <div className="icon_container">
            <Link to="/">
              <span className="material-symbols-outlined nav_icons">home</span>
            </Link>
            <span className="material-symbols-outlined nav_icons filled-icon">
              smart_toy
            </span>
            <Link to="/messages">
              <span className="material-symbols-outlined nav_icons">chat</span>
            </Link>
            <Link to="/account">
              <span className="material-symbols-outlined nav_icons">
                person
              </span>
            </Link>
          </div>
        </Container>
        <Container className="container_class">
          <Heading>
            {" "}
            <InputContainer>
              <Heading color="dimgrey">Alloy</Heading>
              <span
                style={{ color: "dimgrey" }}
                className="material-symbols-outlined"
              >
                smart_toy
              </span>
            </InputContainer>
            <div
              style={
                question === null
                  ? { display: "none" }
                  : {
                      background: "#e2f3f5",
                      padding: 16,
                      marginBottom: 32,
                      borderRadius: 5,
                      paddingBottom: 80,
                      display: "block",
                    }
              }
            >
              <ul>
                {response.map((data) => (
                  <Markdown key={uuidv4()} remarkPlugins={remarkGfm}>
                    {/* <li key={uuidv4()}>
                      <p style={{ fontWeight: 300 }}> */}
                    {data}
                    {/* </p>
                    </li> */}
                  </Markdown>
                ))}
              </ul>
              <div className="flex_container">
                <small style={{ align: "right" }}>
                  {questions[response.length]}{" "}
                </small>
                <h2 style={{ color: "#954535 " }} onClick={resetConversation}>
                  <PiBroom />
                </h2>
              </div>
            </div>
            <Form action="">
              {/* <Input type="text" /> */}
              {/* <button onClick={save}>save me please</button> */}
              <TextareaAutosize
                name="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  resize: "none",
                  marginBottom: "36px",
                  borderWidth: 4,
                }}
              />
              <span
                onClick={chat}
                style={{
                  color: "mediumslateblue",
                  paddingLeft: 16,
                  cursor: "pointer",
                }}
                className="material-symbols-outlined input-icon"
              >
                send
              </span>
            </Form>
          </Heading>
        </Container>
        <Container
          style={{ right: 0 }}
          position="fixed"
          width="300px"
          color="#444444"
        ></Container>
      </Wrapper>
    </div>
  );
}
