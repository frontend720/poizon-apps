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
import { Form, StyledIonItem, StyledIonTextarea } from "./Stylesheet.js";
import {
  addOutline,
  createSharp,
  sendSharp,
  sendOutline,
} from "ionicons/icons";
import "./Tab1.css";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";
import {getFirestore, setDoc, doc} from "firebase/firestore"
import remarkGfm from "remark-gfm"
import {v4 as uuidv4} from "uuid"

const Tab1 = () => {
  const [question, setQuestion] = useState([]);
  const [conversationQuestionHeader, setConversationQuestionHeader] =
    useState("");
  const [response, setResponse] = useState([]);
  const [textModel, setTextModel] = useState(true);
  const [temperature, setTemperature] = useState(0.5);
  const [conversationFingerprint, setConversationFingerprint] = useState();
  const [conversationObj, setConversationObj] = useState("");
  const [additions, setAdditions] = useState([]);
  const [isSaved, setIsSaved] = useState(true);
  const [conversationContext, setConversationContext] = useState("")

  const [sliderText, setSliderText] = useState("");

  const three = "gpt-3.5-turbo-1106";
  const four = "gpt-4";

  console.log(temperature);

  function tempSlider(e) {
    setTemperature(e.detail.value);
  }

  const bookmarkToggle = () => {
    setIsSaved((prev) => !prev);
  };

  console.log(temperature);

  function askQuestion() {
    const request = {
      method: "POST",
      url: "http://localhost:4500/chat",
      data: {
        prompt: question,
        model: textModel ? four : three,
        n: 1,
        temperature: temperature,
        // messages: {}
        response: conversationContext
      },
    };
    axios(request)
      .then((res) => {
        console.log(res.data.choices);
        setResponse(res.data.choices);
        setConversationFingerprint(res.data.system_fingerprint);
        setConversationObj(res.data.object);
        setConversationQuestionHeader(question);
        setQuestion("");
        setConversationContext(response[0].message.content)
        
      })
      .catch((error) => console.log(error));
  }


  function modelToggle(e) {
    setTextModel((prev) => !prev);
    console.log("toggled");
  }

  function tempMeter() {
    if (temperature < 0.25) {
      return "More Concise";
    } else if (temperature > 0.25 && temperature < 0.75) {
      return "More Moderate";
    } else {
      return "More Expressive";
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ width: "90%", margin: "4px auto" }}>
            <IonLabel styled={{ textAlign: "center !important" }} slot="center">
              {/* {temperature < .65 ? "Balanced" : "Precise"} */}
              {tempMeter(temperature)}
            </IonLabel>
            <IonRange
              min={0}
              value={temperature}
              max={1.0}
              step={0.01}
              onIonChange={tempSlider}
            ></IonRange>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="">
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
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              setTimeout(() => ev.target.complete(), 500);
            }}
          >
            {response.map((data) => (
              <>
                <IonCard className="response-card quest_card" color="secondary">
                  <IonCardHeader>
                    <IonCardSubtitle className="user-question">
                      {conversationQuestionHeader}
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
                <IonCard className="response-card response">
                  <IonCardHeader>
                    <IonCardContent>
                      <Markdown remarkPlugins={[remarkGfm]}>{data.message.content}</Markdown>
                      {/* <IonButton slot="end"> */}
                    </IonCardContent>
                    {/* </IonButton> */}
                  </IonCardHeader>
                  <div className="feedback-container">
                  <span class="material-symbols-outlined">flag</span>
                    <div onClick={bookmarkToggle} className="bookmark_toggle">
                      {isSaved ? (
                        <>
                          <h1 className="material-symbols-outlined bookmark">
                            bookmark
                          </h1>
                        </>
                      ) : (
                        <>
                          <h1 style={{color: "#ffb703"}} class="material-symbols-rounded">bookmark</h1>
                        </>
                      )}
                    </div>
                  </div>
                </IonCard>
              </>
            ))}
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
          <div className="ion_fixed_item">
            <StyledIonItem lines="none">
              <>
                <IonIcon
                  onClick={askQuestion}
                  slot="end"
                  size="small"
                  icon={sendOutline}
                />
              </>
              {/* <IonIcon icon={} /> */}
              <StyledIonTextarea
                mode="ios"
                value={question}
                name="question"
                rows="5"
                // onIonChange={(event) => setQuestion(event.target.value)}
                onChange={(e) => setQuestion(e.target.value)}
                maxlength={700}
                counter={true}
                fill="outline"
                color="tertiary"
                className="textarea"
                placeholder="Ask me anything..."
                // enterkeyhint="go"
                // onKeyUp={(e) => {
                //   if (e.key === "Enter") {
                //     console.log("Enter");
                //     askQuestion;
                //   }
                // }}
              ></StyledIonTextarea>
            </StyledIonItem>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

// {id: 'chatcmpl-8S7i0gU6p6tN4OKdn6tJlG91ORAgk', object: 'chat.completion', created: 1701713508, model: 'gpt-4-0613', choices: Array(1), …}

// created: 1701713508

// model: "gpt-4-0613"
// object: "chat.completion"
// system_fingerprint: null
// usage: {prompt_tokens: 15, completion_tokens: 345, total_tokens: 360}
