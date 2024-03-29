/* eslint-disable no-unused-vars */
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { app } from "../config";
import { useState } from "react";

const UserForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputField, setInputField] = useState([{ value: "" }]);
  const [invitee, setInvitee] = useState(inputField);

  const db = getFirestore(app);

  const exchangeId = JSON.stringify(uuid());

  const addGiftExchangeData = (e) => {
    e.preventDefault();
    const options = {
      exchangeId,
      name,
      description,
      //   invitee,
    };

    const giftDataRef = setDoc(doc(db, "gift-data", exchangeId, options));
    giftDataRef
      .then((data) => {
        if (!data) {
          return;
        } else {
          console.log(data);
        }
      })
      .catch((error) => console.log(error));
  };

  const newData = async (e) => {
    let data;
    const dataRef = await setDoc(doc(db, "users", data));
    try {
      if (!data) {
        console.log("Error sending data");
      } else {
         
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="" onSubmit={addGiftExchangeData}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <input
          type="text"
          name="invitee"
          value={invitee}
          onChange={(e) => setInvitee(e.target.value)}
        /> */}
        <button type="submit">add data</button>
      </form>
    </div>
  );
};

export default UserForm;
