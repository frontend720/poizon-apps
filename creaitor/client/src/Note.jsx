import React, { useState, useEffect } from "react";
import Nav from "./Components/Nav";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";

export default function Note() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [responses, setResponses] = useState([])

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
        setResponses(data.data)
        });
  }

  useEffect(() => {
    getNotes()
  },[email])

  return (
    <div className="" style={{ paddingTop: 120 }}>
      <Nav />
      <table>
        {
         responses.map((doc) => (
            <table style={{color: "#fffffa9", width: "100%", padding: 30}}>
                
                <tr style={{color: "#ffffffa7", textAlign: "right", width: "100%", padding: "24px 0px"}}>
                    <th style={{color: "#fffffa9 !important", padding: "24px 0px"}}>{doc.question}</th>
                </tr>
                <tr style={{color: "#ffffff75"}}>
                    <td>{doc.response}</td>
                </tr>
            </table>
         ))
        }
      </table>
    </div>
  );
}
