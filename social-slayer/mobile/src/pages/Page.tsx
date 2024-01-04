import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <h1>that</h1>
        <audio controls src="https://cdns-preview-8.dzcdn.net/stream/c-85b09156c8fecad0cd38d1b1a080b022-2.mp3">
          {/* <source
            src="https://cdns-preview-8.dzcdn.net/stream/c-85b09156c8fecad0cd38d1b1a080b022-2.mp3"
            type="audio/mpeg"> */}
        </audio>
      </IonContent>
    </IonPage>
  );
};

export default Page;
