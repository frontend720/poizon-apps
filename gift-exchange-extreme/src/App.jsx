import { app } from "./config";
import "./App.css";
import UserLobby from "./Components/UserLobby";
import {v4 as uuid} from "uuid"
import UserForm from "./Components/UserForm";


function App() {
  console.log(app);

  return (
    <>
    <UserForm />
      <UserLobby id={uuid()} />
    </>
  );
}

export default App;
