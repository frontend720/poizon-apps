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

import {gsap} from "gsap"
import {Loadingbar} from "./Stylesheet"
export default function Assistant() {

  const bar = useRef(null);
  const contextDisclaimer =
    "Hey there! Just a friendly heads-up: our chat might get a bit tangled if we go back and forth a whole bunch of times. Think of it like a game of catch – after too many throws, I might drop the ball on keeping up with the convo. If we stray into no-go zones, I'll nudge us back on track. Let's keep this chat fun and within the guidelines! 😊👍";

  const [userId, setUserId] = useState();
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [toggle, setToggle] = useState(true);
  const [searchToggle, setSearchToggle] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [response, setResponse] = useState([]);
  const [saveResponse, setSaveResponse] = React.useState(response);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingBarWidth, setLoadingBarWidth] = useState(100);
 
  const [disclaimer, setDisclaimer] = useState(contextDisclaimer)

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setUserId(obj.uid);
    });
  }, []);

  useEffect(() => {
    JSON.stringify(saveResponse)
    localStorage.setItem("conversation", JSON.stringify(response.map((r) => r + question)));
  }, [response])

  const chat = (e) => {
    e.preventDefault();
    const botName = "Gage";
    const tone = " expressive";
    const systime = moment().format("MMMM Do YYYY, h:mm a");
    
    const request = {
      method: "POST",
      url: `${process.env.REACT_APP_NGROK}/new`,
      data: {
        prompt: response.map((r) => (r)) + question,
        bot_name: botName,
        tone,
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
        setSaveResponse((prev) => [
        ...prev,
        question,
       ])
        setToggle((prev) => !prev);
        setSearchToggle();
        setDisclaimer("");
        setIsAnimating(prev => (!prev))
        setLoadingBarWidth(0); //
        
        if (!res.data) {
          console.log("No data to save");
        } else {
          setTimeout(() => {
            save();
          }, 1000);
        }
        return res.data
      })
      .catch((error) => {
        console.log(error.response);
      })
    setQuestion("");
    setIsAnimating(true)
  };

  const save = () => {
    const request = {
      method: "POST",
      url: `${process.env.REACT_APP_NGROK}/save`,
      data: {
        system: response.map((r) => (r)) + question,
        user: question,
        accountId: userId,
        conversationId: uuidv4(),
      },
    };
    axios(request)
      .then((res) => {
       return res.data;
      })
      .catch((error) => error.code);
  };

  const resetConversation = (e) => {
    e.preventDefault();
    setResponse([])
    setQuestions([undefined]);
    setContext("");
    setDisclaimer(contextDisclaimer)
    setToggle(prev => console.log(!prev))
    localStorage.removeItem("conversation");
  };

  const keyboardToggle = () => {
    setSearchToggle((prev) => !prev);
  };

  useEffect(() => {
   localStorage.getItem("conversation")
  }, [response])

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
              className="material-symbols-outlined"
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
                  <div style={isAnimating ? {width: `100%`} : {display: "none"}} className="loading"></div>
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
                    placeholder="Ask me something."
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
                className="material-symbols-outlined keyboard"
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
