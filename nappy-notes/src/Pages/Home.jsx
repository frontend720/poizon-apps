import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  remove,
  update,
  push,
} from "firebase/database";
import { app } from "../config";
import { MDBTextArea, MDBInput, MDBBtn, MDBCard } from "mdb-react-ui-kit";
import {
  List,
  ListItem,
  Button,
  ButtonText,
  HeaderText,
  Head,
  Wrapper,
} from "../StyleSheet";
import moment from "moment";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { v4 as uuid } from "uuid";
import EditNoteCard from "../Components/EditNoteCard";
import Header from "../Components/Header";
function Home() {
  const auth = getAuth(app);
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthToken(user.uid);
    });
  },[]);

  const emailStr = JSON.stringify(authToken);



  const db = getDatabase(app);

  const [noteId, setNoteId] = useState(uuid());
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [defaultText, setDefaultText] = useState("No notes to display");
  const [updateId, setUpdateId] = useState();

  const [stupid, setStupid] = useState();

  const [listStyle, setListStyle] = useState(false);

  const username = "frontend720";

  const [data, setData] = useState([]);

  const [tester, setTester] = useState();

  const [testThisNoteId, setTestThisNoteId] = useState(uuid());

  const newNote = (e) => {
    e.preventDefault();
    setTestThisNoteId(uuid());
    const noteRef = set(ref(db, `${authToken}/${testThisNoteId}`), {
      title,
      note,
      id: testThisNoteId,
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
    const getCollection = get(child(dbRef, `${authToken}/`));
    getCollection.then((coll) => {
      const newNotes = [];
      coll.forEach((note) => {
        if (!note.exists) {
          setDefaultText();
        } else {
          newNotes.push(note.val());
          const data = note.val();
          setNoteId(note.val().id);
        }
      });
      setData(newNotes);
    });
  }

  const listType = (e) => {
    setListStyle((prev) => !prev);
  };

  async function deleteNote(e) {
    e.preventDefault();

    const noteRef = ref(db, `${username}/${tester}`);

    remove(noteRef).then((data) => {
      if (!data) {
        return;
      } else {
        console.log(data);
      }

      setTrigger((prev) => !prev);

      setUpdateId(null);
    });
  }
  // console.log(tester);

  // console.log(username)

  setTimeout(() => {
    getNotes()
  }, 500)

  useEffect(() => {
    getNotes();
    // deleteNote()
  }, [trigger]);

  return (
    <Wrapper>
      <Header title="Nappy Notes" />
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
              <Button background="none">
                <ButtonText>New Note</ButtonText>
              </Button>
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
          {data.map((point) => (
            <List type={listStyle ? "disc" : "none"} key={point.id}>
              <ListItem border=".5px solid #00000050">
                <p style={{ fontWeight: 600, lineHeight: -2 }}>
                  <label htmlFor="" className="note_title">
                    {point.title}
                  </label>
                  <hr />{" "}
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      textTransform: "none",
                    }}
                    htmlFor=""
                  >
                    {point.note}
                    
                  </label>
                </p>
                <small style={{ fontSize: 10 }}>{point.timestamp}</small>
                <EditNoteCard del={deleteNote} />
              </ListItem>
            </List>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default Home;
