import React, { useState } from "react";
import Nav from "./Components/Nav";
import axios from "axios";

export default function Create() {
  const [model, setModel] = React.useState(false);
  const [imageModel, setImageModel] = useState();
  const [image, setImage] = useState([]);
  const [testTrigger, setTestTrigger] = useState("");
  const [prompt, setPrompt] = useState("");

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
        console.log(data.data);
        console.log(data);
        setTestTrigger(data.data[0].url);
        setPrompt("");
      })
      .catch((error) => console.log(error.code));
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
                  </div>
                </>
              ))}
            </>
        <div className="footer" style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
          <div>

          <textarea name="prompt" value={prompt} onChange={(e)=>setPrompt(e.target.value)} style={{width: "70vw", marginRight: 32}} autoFocus id=""  rows="10"></textarea>
          </div>
          <span onClick={imageQuestion} class="material-symbols-outlined">brush</span>
        </div>
      </div>
    </>
  );
}
