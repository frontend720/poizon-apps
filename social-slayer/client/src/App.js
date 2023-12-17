import Homepage from "./Homepage";
import Assistant from "./Assistant";
import "./App.css";
import Messages from "./Messages";
import Account from "./Account";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/account" element={<Account />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
