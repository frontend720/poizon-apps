import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { app } from "../config";
import { MDBTextArea, MDBInput, MDBBtn, MDBCard } from "mdb-react-ui-kit";

import { v4 as uuid } from "uuid";
function Home() {
  console.log(app);

  const db = getDatabase(app);

  const [noteId, setNoteId] = useState(uuid());
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const [data, setData] = useState([]);

  const newNote = (e) => {
    e.preventDefault();
    const noteRef = set(ref(db, "notes/" + uuid()), {
      title,
      note,
      id: uuid(),
    });
    noteRef.then((data) => {
      console.log(data);
      setTitle("");
      setNote("");
    });
  };

  function getNotes() {
    const dbRef = ref(getDatabase());
    const getCollection = get(child(dbRef, `notes/`));
    getCollection.then((coll) => {
      coll.forEach((note) => {
        if (!note.exists) {
          console.log("No notes to display");
        } else {
          setData((prevData) => [...prevData, note.val()]);
        // setData(note.val())
        }
      });
    });
  }

  useEffect(() => {
    // getNotes();
  }, []);

  return (
    <div style={{display: "flex", justifyContent: "space-around"}}>
      <form onSubmit={newNote} action="" style={{width: "40%"}}>
        <MDBCard
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
              rows="5"
            />
          </div>
          <div style={{ margin: "6px 0px" }}>
            <MDBBtn className="w-50" rounded type="submit" color="success">
              New Note
            </MDBBtn>
          </div>
        </MDBCard>
      </form>
      <MDBCard>
        {data.map((point) => (
          <ol key={point.id} style={{listStyle: "none"}}>
            <li style={{border: "2px solid black", padding: 6}}>
            <p>{point.title}</p>
            <p>{point.note}</p>
            </li>
          </ol>
        ))}
      </MDBCard>
    </div>
  );
}

export default Home;
