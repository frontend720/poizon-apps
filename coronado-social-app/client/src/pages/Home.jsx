import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon
} from "@ionic/react";
import { useState } from "react";
import "./Home.css";
import axios from "axios";
import { Wrapper, Button, Input, Textarea, Form } from "../../StyleSheet";
import AccountFormComponent from "../components/AccountFormComponent";
import {createOutline} from "ionicons/icons"

const Home = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState("");

  function newData(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:4600",
      data: {
        username: username,
        age: age,
        bio: bio,
        profileImage: profileImage,
      },
    })
      .then((data) => {
        console.log(data);
        setBio("");
        setAge("");
        setUsername("");
      })
      .catch((err) => {
        setError(err.code);
      });
  }

  const toggler = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <Wrapper color="#ff006e">
      <IonIcon onClick={toggler} size="large" icon={createOutline} />
      <AccountFormComponent
        display={toggle ? "none" : "block"}
        cancelToggle={toggler}
        username={username}
        bio={bio}
        age={age}
        ageChange={(e) => setAge(e.target.value)}
        bioChange={(e) => setBio(e.target.value)}
        usernameChange={(e) => setUsername(e.target.value)}
        submit={newData}
      />
    </Wrapper>
  );
};

export default Home;
