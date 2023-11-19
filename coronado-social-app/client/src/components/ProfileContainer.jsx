import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container, Body, Heading, Button } from "../../StyleSheet";
import { IonIcon } from "@ionic/react";
import { createOutline, cameraOutline } from "ionicons/icons";
import app from "../config";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";

export default function ProfileContainer({ editToggle, display }) {
  const auth = getAuth(app);
  const [authObj, setAuthObj] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj.email);
    });
  }, []);

  function getUser() {
    if (!authObj) {
      return;
    } else {
      axios({
        method: "GET",
        url: `http://localhost:4600/${authObj}`,
      }).then((response) => {
        console.log(response.data);
        setData(response.data.profileImage);
        setUsername(response.data.username);
        setBio(response.data.bio);
      });
    }
  }

  function logout() {
    signOut(auth)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error.code));
  }

  useEffect(() => {
    getUser();
  }, [authObj]);

  // getUser()

  console.log(authObj);

  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [trigger, setTrigger] = useState(null);


  console.log(data);

  return (
    <div style={{ display: display }}>
      <Container>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <input
            style={{ display: "none" }}
            id="camera-icon"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={data}
            style={
              imageUrl !== undefined
                ? { display: "none" }
                : {
                    display: "block",
                    width: "100%",
                    alignSelf: "center",
                    maxHeight: 450,
                    borderRadius: 15,
                  }
            }
            alt=""
          />

          <label style={{ textAlign: "right" }} htmlFor="camera-icon">
            <IonIcon
              icon={cameraOutline}
              size="large"
              style={{ textAlign: "right" }}
              color="#444444"
            />
          </label>
          {/* <button onClick={upload}>upload</button> */}
        </div>
        <Heading>{username}</Heading>
        <Body align="center">{bio}</Body>
        <IonIcon onClick={editToggle} size="large" icon={createOutline} />
      </Container>
      <Button
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "10%",
        }}
        onClick={logout}
      >
        <span
          style={{ fontSize: 26, paddingRight: 16 }}
          className="material-symbols-outlined pet"
        >
          logout
        </span>
        logout
      </Button>
    </div>
  );
}
