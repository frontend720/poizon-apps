import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home";
import Destination from "./Pages/Destination";
import Crew from "./Pages/Crew";
import Technology from "./Pages/Technology";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        
          <Route index path="/" element={<Home />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
        
      </Routes>
    </>
  );
}

export default App;
