import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Wrapper, Button, Input, Textarea, Form } from "../../StyleSheet";
import AccountFormComponent from "../components/AccountFormComponent";
import { createOutline } from "ionicons/icons";
import ProfileContainer from "../components/ProfileContainer";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import app from "../config";

const Home = () => {

const auth = getAuth(app)

  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState("");
  const [authObj, setAuthObj] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj.email)
    })
  },[])

  function newData(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: `http://localhost:4600/${authObj}`,
      data: {
        username: username,
        age: age,
        bio: bio
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
      {toggle ? (
        <>
          <AccountFormComponent
            display={toggle ? "block" : "none"}
            cancelToggle={toggler}
            username={username}
            bio={bio}
            age={age}
            ageChange={(e) => setAge(e.target.value)}
            bioChange={(e) => setBio(e.target.value)}
            usernameChange={(e) => setUsername(e.target.value)}
            submit={newData}
          />
        </>
      ) : (
        <ProfileContainer
          editToggle={toggler}
          display={toggle ? "none" : "block"}
        />
      )}
    </Wrapper>
  );
};

export default Home;
