import React from "react";
import { useState, useEffect } from "react";
import { TaskContainer } from "../Styles";
import TextareaAutosize from "react-textarea-autosize";
import "./Tasks.css";
import { app } from "../config";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  onSnapshot,
  deleteDoc
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function Tasks() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [notes, setNotes] = useState([]);
  const [isTask, setIsTask] = useState();
  const [taskData, setTaskData] = useState();

  const db = getFirestore(app);

  function addNote(e) {
    e.preventDefault();
    const taskReference = setDoc(doc(db, "tasks", title), {
      title: title,
      task: task,
      id: uuidv4(),
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    taskReference
      .then((data) => {
        if (!task) {
          console.log("No task to create");
        } else {
          setTaskData(data);
          setIsTask(data);
        }
      })
      .catch((error) => console.log(error.code));
    setTitle("");
    setTask("");
    
  }

  function getNotes() {
    const reference = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(data);
    });
    return () => reference();
  }

  function deleteNote(e){
    e.preventDefault()
    const reference = doc(db, "tasks")
    deleteDoc(reference)
  }

  useEffect(() => {
    getNotes();
   
  }, [db, taskData]);


  return (
    <TaskContainer>
      <div className="all_notes">
        <header className="all_notes_header">
          <span className="material-symbols-outlined icons">menu</span>
          <label htmlFor="">All Notes</label>
          <span className="material-symbols-outlined icons">edit_square</span>
        </header>
        <div className="note_container">
          {notes.map((note) => (
            <div className="task_preview" key={note.id}>
              <div>
                <h4 className="task_title">{note.title}</h4>
                <p className="task_preview_content">{note.task}</p>
                <small htmlFor="">{note.createdAt}</small>
              </div>
              <span onClick={deleteNote}  class="material-symbols-outlined trash">delete</span>
              {/* {setTaskId(note.title)} */}
            </div>
          ))}
        </div>
      </div>
      <div className="note_body">
        <header className="note_body_header">
          <span className="material-symbols-outlined icons">thumbnail_bar</span>
          <div className="right_icons">
            <span className="material-symbols-outlined icons">info</span>
            <span
              style={{ marginLeft: 25 }}
              className="material-symbols-outlined icons"
            >
              done
            </span>
          </div>
        </header>
        <form className="task_form" action="">
          <input
            className="task_title_input"
            type="text"
            placeholder="Give your tasks a theme song..."
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            className="task_textarea"
            placeholder="Now add one to the list..."
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            style={task.length > 1 ? { display: "flex" } : { display: "none" }}
            onClick={addNote}
            type="submit"
            className="task_button"
          >
            <span className="material-symbols-outlined add">add</span>
            <label className="task_button_label" htmlFor="">
              Create
            </label>
          </button>
        </form>
      </div>
    </TaskContainer>
  );
}
