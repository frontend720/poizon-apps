import React, { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import axios from "axios";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";
import { v4 as uuidv4 } from "uuid";

export default function Create() {
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [model, setModel] = React.useState(false);
  const [imageModel, setImageModel] = useState();
  const [image, setImage] = useState([]);
  const [testTrigger, setTestTrigger] = useState("");
  const [prompt, setPrompt] = useState("");
  const [email, setEmail] = useState("");
  const [threePrompt, setThreePrompt] = useState("");

  const [editPrompt, setEditPrompt] = useState("");
  const [mask, setMask] = useState();
  const [imageToEdit, setImageToEdit] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setEmail(obj.email);
    });
  }, []);

  function imageQuestion(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/image",
      data: {
        prompt: prompt,
        model: !model ? "dall-e-3" : "dall-e-2",
        n: !imageModel ? 1 : 3,
      },
    };
    axios(request)
      .then((data) => {
        setImage(data.data);
        console.log(data.data[0].revised_prompt);
        setThreePrompt(data.data[0].revised_prompt);
        console.log(data);
        console.log(data.data);
        console.log(data);
        setTestTrigger(data.data[0].url);
        console.log(data.data[0].url);
        setPrompt("");
      })
      .catch((error) => console.log(error.code));
  }

  function saveImage(e) {
    e.preventDefault();
    const collectionRef = doc(db, "accounts", email, "images", uuidv4());
    setDoc(collectionRef, {
      imageUrl: testTrigger,
      prompt: !model ? threePrompt : "",
      id: uuidv4(),
      model: !model ? "dall-e-3" : "dall-e-2",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error.code));
  }

  function editImage(e) {
    e.preventDefault();
    const request = {
      method: "POST",
      url: "http://localhost:4500/image/edit",
      data: {
        editPrompt: editPrompt,
        mask: mask,
        image: imageToEdit,
      },
    };
    axios(request).then((data) => console.log(data.data));
  }

  const modelToggle = () => {
    setModel((prev) => !prev);
  };
  return (
    <>
      <Nav
        switchModel={modelToggle}
        type="palette"
        modelState={!model ? "looks_two" : "looks_3"}
      />
      <div className="canvas">
        <>
          {image.map((i) => (
            <>
              <div key={i.url}>
                <div className="image_response_container">
                  <img src={i.url} alt="" />
                </div>
                <button onClick={saveImage}>
                  <span class="material-symbols-outlined">bookmark</span>
                </button>
              </div>
            </>
          ))}
        </>
        <div
          className="footer"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <form action="">
              <input
                name="editPrompt"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                type="text"
              />
              <input
                type="text"
                name="mask"
                value={mask}
                onChange={(e) => setMask(e.target.value)}
              />
              <input
                type="text"
                name="imageToEdit"
                value={imageToEdit}
                onChange={(e) => setImageToEdit(e.target.value)}
              />
              <button>edit</button>
            </form>

            <textarea
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ width: "70vw", marginRight: 32 }}
              autoFocus
              id=""
              rows="10"
            ></textarea>
          </div>
          <span onClick={imageQuestion} class="material-symbols-outlined">
            brush
          </span>
        </div>
      </div>
    </>
  );
}
