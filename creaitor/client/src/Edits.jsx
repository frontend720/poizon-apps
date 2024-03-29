import React from "react";
import { getStorage } from "firebase/storage";
import { app } from "./config";

export default function Edits({ toggle }) {
  const storage = getStorage(app);

  return (
    <div>
      <button onClick={toggle}>toggle component</button>
      Edits
    </div>
  );
}
