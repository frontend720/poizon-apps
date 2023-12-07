import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonRange,
  IonInfiniteScrollContent,
  IonCardContent,
  IonIcon,
  
} from "@ionic/react";
import {useState} from "react"
import axios from "axios"

import "./Tab2.css";
import { StyledIonItem, StyledIonTextarea, StyledImage } from "./Stylesheet";

import {
  addOutline,
  createSharp,
  sendSharp,
  sendOutline,
} from "ionicons/icons";


const Tab2 = () => {
  const [imageModel, setImageModel] = useState(true)
  const [image, setImage ] = useState("")
  const [prompt, setPrompt] = useState("")
  const [error, setError] = useState("")
  const two = "dall-e-2"
  const three = "dall-e-3"


function newImage(e){
  e.preventDefault()
  const request = {
    method: "POST",
    url: "http://localhost:4500/image",
    data: {
      prompt: prompt,
      model: !imageModel ? three : two,
      n: 1,
    },
  };
  axios(request).then((data) => {
    console.log(data.data[0].url)
    setImage(data.data[0].url)
    setPrompt("")
    setError("Complete")

  }).catch((error) => {
    setError(error.code)
  })
}

function modelToggle(){
  setImageModel(prev => !prev)
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonCardSubtitle slot="end">Image Generation</IonCardSubtitle>
        </IonToolbar>
          <IonSegment
          onClick={modelToggle}         
            value={imageModel === true ? two : three}
          >
            <IonSegmentButton value={two}>
              <IonLabel style={{textTransform: "uppercase"}}>{two}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value={three}>
              <IonLabel style={{textTransform: "uppercase"}}>{three}</IonLabel>
            </IonSegmentButton>
          </IonSegment>
      </IonHeader>
      <IonContent>
        <div className="">
            {
             <StyledImage src={image} />
            }
          <IonInfiniteScroll
            onIonInfinite={(ev) => {
              setTimeout(() => ev.target.complete(), 500);
            }}
          >         
            <IonInfiniteScrollContent></IonInfiniteScrollContent>
          </IonInfiniteScroll>
          <div className="ion_fixed_item">
            <StyledIonItem lines="none">
              <>
                <IonIcon
                  onClick={newImage}
                  slot="end"
                  size="small"
                  icon={sendOutline}
                />
              </>
              <StyledIonTextarea
                mode="ios"
                value={prompt}
                name="prompt"
                rows="5"
                onChange={(e) => setPrompt(e.target.value)}
                maxlength={700}
                counter={true}
                fill="outline"
                color="tertiary"
                className="textarea"
                placeholder="Whats in your head?..."
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

export default Tab2;
