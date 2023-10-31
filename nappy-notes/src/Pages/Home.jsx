import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { app } from "../config";
import { MDBTextArea, MDBInput, MDBBtn, MDBCard } from "mdb-react-ui-kit";
import { List, ListItem } from "../StyleSheet";
import moment from "moment";

import { v4 as uuid } from "uuid";
function Home() {
  console.log(app);

  const db = getDatabase(app);

  const [noteId, setNoteId] = useState(uuid());
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [defaultText, setDefaultText] = useState("No notes to display");

  const [listStyle, setListStyle] = useState(false);

  const username = "doccnasty";

  const [data, setData] = useState([]);

  const newNote = (e) => {
    e.preventDefault();
    const noteRef = set(ref(db, `${username}/${uuid()}`), {
      title,
      note,
      id: uuid(),
      timestamp: moment().format("LLL"),
    });
    noteRef.then((data) => {
      console.log(data);
      setTitle("");
      setNote("");
      setTrigger((prev) => !prev);
    });
  };

  function getNotes() {
    const dbRef = ref(getDatabase());
    const getCollection = get(child(dbRef, `${username}/`));
    getCollection.then((coll) => {
      coll.forEach((note) => {
        if (!note.exists) {
          setDefaultText();
        } else {
          setData((prevData) => [...prevData, note.val()]);
        }
      });
    });
  }

  const listType = (e) => {
    setListStyle((prev) => !prev);
  };

  useEffect(() => {
    getNotes();
  }, [trigger]);

  return (
    <div>
      <div style={{ background: "#44444475", width: "100%" }}>
        <h1
          className="app_title"
          style={{ padding: 24, textTransform: "uppercase" }}
        >
          Nappy Notes
        </h1>
        <hr />
      </div>
      <div className="note_container">
        <form onSubmit={newNote} action="">
          <div
            className="p-2"
            action=""
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <MDBInput
                style={{ margin: "12px 0px" }}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Title"
                type="text"
              />
            </div>

            <div>
              <MDBTextArea
                style={{ margin: "12px 0px" }}
                label="Note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="10"
              />
            </div>
            <div style={{ margin: "6px 0px" }}>
              <MDBBtn className="w-50" rounded type="submit" color="success">
                New Note
              </MDBBtn>
            </div>
          </div>
        </form>
        <div>
          <label
            onClick={listType}
            style={{
              padding: 32,
              textAlign: "right",
              textTransform: "uppercase",
              fontWeight: 900,
            }}
          >
            {!listStyle ? "Add bullets" : "Remove bullets"}
          </label>
          {data.map((point) =>
            point.title && point.note === "" ? (
              <>
                <h1>{defaultText}</h1>
              </>
            ) : (
              <List type={listStyle ? "disc" : "none"} key={point.id}>
                <ListItem border=".5px solid #00000050">
                  <p style={{ fontWeight: 600, lineHeight: -2 }}>
                    <label htmlFor="" className="note_title">
                      {point.title}
                    </label>
                    <hr />{" "}
                    <label style={{ fontSize: 12, fontWeight: 400 }} htmlFor="">
                      {point.note}
                    </label>
                  </p>
                  <small style={{ fontSize: 10 }}>{point.timestamp}</small>
                </ListItem>
              </List>
            )
          )}
        </div>
        
      </div>
    </div>
  );
}

export default Home;
