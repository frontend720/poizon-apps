import React, {useState} from "react";
import { Head, HeaderText, Button, ButtonText } from "../StyleSheet";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";

export default function Header({ title }) {
  const auth = getAuth(app);

  const [signout, setSignout] = useState()

  const logout = (e) => {
    e.preventDefault();
    signOut(auth).then((user) => {
        console.log(user)
        setSignout(user.uid)
    });
    // console.log(auth);
  };

  console.log(signout)

  return (
    <Head>
      <div style={{ display: "flex" }}>
        <HeaderText>{title}</HeaderText>
        <Button onClick={logout} background="#00000000" width="5%" height="50%">
          <ButtonText>Logout</ButtonText>
        </Button>
      </div>

      <hr />
    </Head>
  );
}
