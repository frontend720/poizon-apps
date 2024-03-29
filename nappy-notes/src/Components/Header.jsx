import React, {useState} from "react";
import { Head, HeaderText, Button, ButtonText } from "../StyleSheet";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";

export default function Header({ title, email }) {
  const auth = getAuth(app);

  const [signout, setSignout] = useState()

  const logout = (e) => {
    e.preventDefault();
    signOut(auth).then((user) => {
        console.log(user)
        setSignout(user)
    });
    // console.log(auth);
  };

//   console.log(signout)

  return (
    <Head>
      <div style={{ display: "flex" }}>
        <div style={{lineHeight: .01}}>

        <HeaderText>{title}</HeaderText>
        <label htmlFor="">{email}</label>
        </div>
        <Button display={signout !== undefined ? "none" : ""} onClick={logout} background="#00000000" width="5%" height="50%">
          <ButtonText>Logout</ButtonText>
        </Button>
      </div>

      <hr />
    </Head>
  );
}
