import React, { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Container, Body, Heading } from "../../StyleSheet";
import { IonIcon } from "@ionic/react";
import { createOutline, cameraOutline } from "ionicons/icons";
import app from "../config";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export default function ProfileContainer({ editToggle, display }) {
  const auth = getAuth(app);
  const [authObj, setAuthObj] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setAuthObj(obj.email);
    });
  }, []);

  function getUser() {
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

  useEffect(() => {
    getUser();
  }, []);

  // getUser()

  console.log(authObj);

  const [image, setImage] = useState(undefined);
  const [accountId, setAccountId] = useState(uuid());
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");

  function addImage() {
    axios({
      method: "POST",
      url: `http://localhost:4600/image/${authObj}`,
      data: {
        profileImage: imageUrl,
      },
    })
      .then((data) => {
        console.log(data.data);
        setTimeout(() => {
          getUser();
        }, 1500);
      })
      .catch((error) => console.log(error.code));
  }

  const storage = getStorage(app);
  //   console.log(uuid());

  async function upload() {
    const imageRef = ref(storage, `images/${authObj}`);
    try {
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      setTimeout(() => {
        addImage();
      }, 2000);
    } catch (error) {
      console.log(error.code);
    }
  }

  useEffect(() => {
    upload();
  }, [image]);

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
              image === undefined
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
    </div>
  );
}
