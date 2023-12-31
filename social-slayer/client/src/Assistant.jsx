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

export default function Assistant() {
  const [response, setResponse] = React.useState([]);
  const [question, setQuestion] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [responses, setResponses] = React.useState([response]);
  const [userId, setUserId] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [saveResponse, setSaveResponse] = React.useState("");
  const [context, setContext] = React.useState("");
  const [searchToggle, setSearchToggle] = React.useState(true)

  const auth = getAuth(app);

  React.useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setUserId(obj.uid);
    });
  }, []);

const port = "https://37ef-2605-a601-a9d0-9200-e0a7-2227-54a3-ccdb.ngrok-free.app"

  const chat = (e) => {
    e.preventDefault();
    const request = {
      method: "POST",
      url: `${port}/new`,
      data: {
        prompt: JSON.stringify(context) + question,
        bot_name: "DeAndre",
        tone: "friendly, expressive",
        userId: userId,
        systime: moment().format("MMMM Do YYYY, h:mm a"),
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data);
        setResponse((prev) => [...prev, question, res.data[0].message.content]);
        setQuestions((prev) => [question]);
        setSaveResponse(res.data[0].message.content);
        setQuestion("");
        setToggle((prev) => !prev);
        setSearchToggle()
        // keyboardToggle()
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
        console.log(error.response);
      });
    // setQuestions((prev) => [...prev, question]);
    setResponses((prev) => [...prev, response]);
  };

  const thread = () => {
    const request = {
      method: "POST",
      url: `${port}/create-thread`,
      data: {
        thread: JSON.stringify(response) + question,
      },
    };
    axios
      .request(request)
      .then((res) => {
        setContext(res.data);
        console.log(context);
      })
      .catch((error) => console.log(error.code));
  };

  React.useEffect(() => {
    thread();
  }, [toggle]);

  const save = () => {
    const request = {
      method: "POST",
      url: `${process.env.REACT_APP_PORT}/save`,
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
    setContext("");
  };

  const keyboardToggle = () => {

setSearchToggle(prev => !prev)

  }

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
        columns="10% 1fr"
        style={{ height: "20vh !important" }}
      >
        <Container width="" style={{ left: 0 }} color="#444444">
          <header
            style={{
              width: "10%",
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
            <div style={{ paddingBottom: 110 }}>
              <div
                style={
                  question === null
                    ? { display: "none" }
                    : {
                        background: "#4b50511f",
                        padding: 16,
                        borderRadius: 5,
                        display: "block",
                      }
                }
              >
                <div>
                  <div
                    onClick={resetConversation}
                    style={{ width: "100% !important", alignContent: "right" }}
                  >
                    <label
                      style={{
                        color: "#954535 ",
                        textAlign: "right",
                        paddingBottom: 30,
                      }}
                    >
                      <PiBroom />
                    </label>
                  </div>
                  {response.map((data) => (
                    <Markdown key={uuidv4()} remarkPlugins={remarkGfm}>
                      {data}
                    </Markdown>
                  ))}
                </div>
                <div className="flex_container"></div>
              </div>
            </div>
            <Form action="">
              <div style={searchToggle ? {display: ""} : {display: "none"}}  onSubmit={chat} className="textarea_container">
               

                <TextareaAutosize
                  name="question"
                  value={question}
                  maxRows="6"
                  onChange={(e) => setQuestion(e.target.value)}
                  className="textarea"
                  style={{
                    width: "100%",
                    // borderRadius: 10,
                    padding: 12,
                    fontSize: 16,
                    resize: "none",
                    marginBottom: "36px",
                    borderWidth: 0,
                  }}
                />
                <>

                <span onClick={chat}  className="material-symbols-outlined send">send</span>
                </>
              
              </div>

              <span onClick={keyboardToggle} style={searchToggle ? {display: "none"} : {display: "block"}} class="material-symbols-outlined keyboard">keyboard</span>
            </Form>
          </Heading>
        </Container>
      </Wrapper>
    </div>
  );
}

//  <div style={{background: "red  !important", padding: 6}}>

// <span
// onClick={chat}
// style={{
//   color: "yellow",
//   paddingLeft: 16,
//   cursor: "pointer",
// }}
// className="material-symbols-outlined input-icon"
// >
// send
// </span>
// </div>
