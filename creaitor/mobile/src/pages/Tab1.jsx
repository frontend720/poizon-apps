import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonRange,
} from "@ionic/react";
import { Form, StyledIonItem, StyledIonTextarea, DummyText } from "./Stylesheet.js";
import { sendOutline } from "ionicons/icons";
import app from "../firebase.js";
import "./Tab1.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";
import { GiBroom } from "react-icons/gi";
import { BiSolidPin, BiPin } from "react-icons/bi";
import { RiSendPlane2Fill } from "react-icons/ri";
const Tab1 = () => {

const db = getFirestore(app)

const [loadingtext, setLoadingText] = useState([])

  const [question, setQuestion] = useState("");
  const [conversationQuestionHeader, setConversationQuestionHeader] =useState("");
  const [response, setResponse] = useState([]);
  const [textModel, setTextModel] = useState(true);
  const [temperature, setTemperature] = useState(0.5);
  const [conversationFingerprint, setConversationFingerprint] = useState();
  const [conversationObj, setConversationObj] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [conversationContext, setConversationContext] = useState("");
  const [conversationId, setConversationId] = useState(uuidv4())

  const three = "gpt-3.5-turbo-1106";
  const four = "gpt-4";

  // console.log(temperature);

  function tempSlider(e) {
    setTemperature(e.detail.value);
  }




function loadAnimation(){
    const characters = [
      " "
    ]
    for (var i = 0; i < characters.length; i += 1) {
    ((i) => {
        setInterval(() => { 
          characters[i] += characters.length
            setLoadingText(characters[i])
        },50)
    })(i);
}
}

useEffect(() => {
  loadAnimation()
}, [])


  const bookmarkToggle = () => {
    setIsSaved((prev) => !prev);
  };

  // console.log(temperature);

  function askQuestion() {
    const request = {
      method: "POST",
      url: "http://localhost:4500/chat",
      data: {
        prompt: question,
        model: textModel ? four : three,
        n: 1,
        temperature: temperature,
        response: conversationContext + conversationQuestionHeader,
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data.choices);
        setResponse(res.data.choices);
        setConversationFingerprint(response[0].finish_reason);
        setConversationObj(res.data.object);
        setConversationQuestionHeader(question);
        setConversationContext(response[0].message.content);
        console.log(conversationFingerprint)
        setQuestion("")
      })
      .catch((error) => console.log(error));
  }

//  console.log( conversationFingerprint)

  function saveConversation(e) {
    e.preventDefault();
    const collectionRef = setDoc(doc(db, "convos", conversationId) ,{
      question: conversationQuestionHeader,
      answer: (response[0].message.content)
    });
    collectionRef.then((data) => {
      console.log(data)
      
    }).catch((error) => {
      console.log(error)
    })
  }

  function newConversation(e) {
    e.preventDefault();
    setConversationContext("");
    setConversationQuestionHeader("");
    setResponse([]);
    setConversationId(uuidv4())
    setIsSaved(prev => !prev)
    setQuestion("")
  }

  function modelToggle(e) {
    setTextModel((prev) => !prev);
    console.log("toggled");
  }

  function tempMeter() {
    if (temperature < 0.25) {
      return "More Concise";
    } else if (temperature > 0.4 && temperature < 0.6) {
      return "Moderate";
    } else {
      return "More Expressive";
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ width: "90%", margin: "4px auto", color: "#ffffffd7" }}>
            <IonLabel styled={{ textAlign: "center !important" }} slot="center">
              <IonCardSubtitle style={{ color: "#ffffffd7" }}>
           
                {tempMeter(temperature)}
              </IonCardSubtitle>
            </IonLabel>
            <IonRange
              min={0}
              value={temperature}
              max={1.0}
              step={0.05}
              onIonChange={tempSlider}
              snaps="true"
              ticks="false"
            ></IonRange>
          </div>
        </IonToolbar>
        <IonSegment
          onIonChange={modelToggle}
          value={!textModel === true ? three : four}
        >
          <IonSegmentButton value={three}>
            <IonLabel>GPT-3</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={four}>
            <IonLabel>GPT-4</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        
      </IonHeader>
      <IonContent>
        <div className="content-container">
  
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            {response.map((data) => (
              <>
                <IonCard className="response-card quest_card" color="medium">
                  <IonCardHeader>
                    <IonCardSubtitle className="user-question">
                      {conversationQuestionHeader}
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
                <IonCard className="response-card response">
                  <IonCardHeader>
                    <IonCardContent>
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {data.message.content}
                      </Markdown>
                    </IonCardContent>
                  </IonCardHeader>
                  <div className="feedback-container">
                    <h4 style={{ color: "tan", fontSize: 26, paddingLeft: 5 }}>
                      <GiBroom onClick={newConversation} />
                    </h4>
                    <div onClick={bookmarkToggle} className="bookmark_toggle">
                      <h4
                      onClick={saveConversation}
                        style={
                          isSaved
                            ? { color: "grey", transform: "rotate(-35deg)" }
                            : { color: "#1640D6", fontSize: 26 }
                        }
                      >
                        <BiSolidPin />
                      </h4>
                    </div>
                  </div>
                </IonCard>
              </>
            ))}
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
     
          <div className="ion_fixed_item">
            <StyledIonItem lines="none">
              <StyledIonTextarea
                mode="ios"
                value={question}
                name="question"
                rows="5"
                onChange={(e) => setQuestion(e.target.value)}
                maxlength={700}
                counter={true}
                fill="outline"
                color="tertiary"
                className="textarea"
                placeholder={question}
              ></StyledIonTextarea>
              <div onClick={askQuestion}>
                <h1 class="material-symbols-rounded" style={{ color: "#0B666A", fontSize: 40, color: "#ffffffd7" }}>
                mode_comment
                </h1>
              </div>
            </StyledIonItem>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
