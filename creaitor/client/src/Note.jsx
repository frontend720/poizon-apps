import React, { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Markdown from "react-markdown";
import { app } from "./config";

export default function Note() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [responses, setResponses] = useState([]);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (obj) => {
      setEmail(obj.email);
    });
  }, []);

  function getNotes() {
    const request = {
      method: "GET",
      url: `http://localhost:4500/chat/${email}`,
    };
    axios(request).then((data) => {
      setResponses(data.data);
    });
  }

  useEffect(() => {
    getNotes();
  }, [email]);

  const bodyToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="" style={{ paddingTop: 120 }}>
      <Nav />
      <table>
        {responses.map((doc) => (
          <table style={{ color: "#211f1f", width: "100%", padding: 30 }}>
            <tr
              style={{
                color: "#d0bfbf",
                textAlign: "right",
                width: "100%",
                padding: "24px 8px",
              }}
            >
              <th
                style={{
                  color: "#f2dede !important",
                  padding: "8px 4px",
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <p style={{fontSize: 16}} onClick={bodyToggle} class="material-symbols-outlined">{!isVisible ? "visibility" : "visibility_off"}</p>
                <td>{doc.question}</td>
              </th>
            </tr>
            <tr style={ isVisible ? { color: "#ffffff75" } : {display: "none"}}>
              <td>
                <Markdown>{doc.response}</Markdown>
              </td>
            </tr>
          </table>
        ))}
      </table>
    </div>
  );
}
