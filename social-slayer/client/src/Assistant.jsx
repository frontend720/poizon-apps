import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Container,
  Heading,
  InputContainer,
  Form,
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
import { setDoc, doc, getFirestore } from "firebase/firestore";

export default function Assistant() {
  const contextDisclaimer =
    "Hey there! Just a friendly heads-up: our chat might get a bit tangled if we go back and forth a whole bunch of times. Think of it like a game of catch – after too many throws, I might drop the ball on keeping up with the convo. If we stray into no-go zones, I'll nudge us back on track. Let's keep this chat fun and within the guidelines! 😊👍";

  const [userId, setUserId] = useState();
  const [question, setQuestion] = useState("");
  const [saveResponse, setSaveResponse] = React.useState("");
  const [context, setContext] = useState("");
  const [toggle, setToggle] = useState(true);
  const [searchToggle, setSearchToggle] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [responses, setResponses] = useState([response]);
  const [disclaimer, setDisclaimer] = useState(contextDisclaimer)

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setUserId(obj.uid);
    });
  }, []);

  const messageLimit =
    "Oh, snap! It looks like we've been chatting up a storm and I might be getting a wee bit tangled in our convo yarn. 😅 After a bunch of back-and-forths, I can start to drop the conversational ball. But fear not! If I start to sound like I'm talking in riddles, just give me a nudge and we'll steer this chat-ship back to clear waters.";
  const usageError =
    "I won't be able to assist with that. But don't worry, I'm here to help with plenty of other topics! Let's steer this ship back to the safe waters of our conversation policies, and we'll be smooth sailing again. How about we try a different question or topic within the guidelines? ";

  const chat = (e) => {
    e.preventDefault();
    const botName = "DeAndre";
    const tone = "friendly, expressive";
    const systime = moment().format("MMMM Do YYYY, h:mm a");
    
    const request = {
      method: "POST",
      url: `${process.env.REACT_APP_NGROK}/new`,
      data: {
        prompt: response.map((r) => JSON.stringify(r)) +question,
        bot_name: botName,
        tone,
        userId,
        systime,
      },
    };
    
    const elipse = "...";
    
    axios(request)
      .then((res) => {
        console.log(res.data); 
        const messageContent = res.data[0].message.content;     
        setResponse((prev) => [
          ...prev,
          question.slice(0, 120).concat(question.length > 120 ? elipse : ""),
          messageContent,
        ]);
        
        setQuestions((prev) => [...prev, question]);
       setSaveResponse((prev) => [
        ...prev,
        question,
        console.log(messageContent)
       ])
        
        setToggle((prev) => !prev);
        setSearchToggle();
        setDisclaimer("");
        
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
    
    setResponses((prev) => [...prev, response]);
    setQuestion("");
  };

  const save = () => {
    const request = {
      method: "POST",
      url: `${process.env.REACT_APP_NGROK}/save`,
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
    console.log(setResponse([]));
    setQuestions([undefined]);
    setContext("");
    setDisclaimer(contextDisclaimer)
  };

  const keyboardToggle = () => {
    setSearchToggle((prev) => !prev);
  };

  return (
    <div className="assistant_container">
      <Wrapper
        display="grid"
        columns="10% 1fr"
        style={{ height: "20vh !important" }}
      >
        <Container width="" style={{ left: 0 }} color="#444444">
          <header
          className="assistant_header">
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
            <div
              onClick={resetConversation}
              // className="reset_container"
              style={{
                width: "100% !important",
                alignContent: "right",
                marginTop: 100,
              }}
            >
              <label className="reset_icon_style">
                <PiBroom />
              </label>
            </div>
            <span
            onClick={keyboardToggle}
              style={searchToggle ? { position: "absolute", bottom: 0, marginBottom: 52 } : {display: "none"}}
              class="material-symbols-outlined"
            >
              arrow_forward_ios
            </span>
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
            <p className="text" style={{ fontWeight: "300" }}>
              {disclaimer}
            </p>
            <div style={{ paddingBottom: 150 }}>
              <div
                style={
                  question === null
                    ? { display: "none" }
                    : {
                        padding: 16,
                        display: "block",
                      }
                }
              >
                <div>
                  {response.map((data) => (
                    <Markdown
                      className="text"
                      key={uuidv4()}
                      remarkPlugins={remarkGfm}
                    >
                      {data}
                    </Markdown>
                  ))}
                </div>
                <div className="flex_container"></div>
              </div>
            </div>        
            <Form action="">
              <div style={{ width: "100vw" }}>
                <div
                  style={searchToggle ? { display: "" } : { display: "none" }}
                  onSubmit={chat}
                  className="textarea_container"
                >
                  <TextareaAutosize
                    name="question"
                    value={question}
                    maxRows="6"
                    onChange={(e) => setQuestion(e.target.value)}
                    className="textarea"
                    
                    autoFocus={true }
                  />
                  <>
                    <span
                      onClick={chat}
                      className="material-symbols-outlined send filled"
                    >
                      send
                    </span>
                  </>
                </div>
              </div>
              <span
                onClick={keyboardToggle}
                style={
                  searchToggle ? { display: "none" } : { display: "block" }
                }
                class="material-symbols-outlined keyboard"
              >
                keyboard
              </span>
            </Form>
          </Heading>
        </Container>
      </Wrapper>
    </div>
  );
}
