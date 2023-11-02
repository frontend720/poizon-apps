import React, { useState } from "react";
import {
  Wrapper,
  Head,
  HeaderText,
  Form,
  Input,
  Button,
  ButtonText,
} from "../StyleSheet";
import Header from "../Components/Header";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { app } from "../config";

export default function Authentication() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationCode, setVerificationCode] = useState("");
  const [authToggle, setAuthToggle] = useState(false)

  const newUser = (e) => {
    e.preventDefault();
    const userRef = createUserWithEmailAndPassword(auth, email, password);
    userRef
      .then((credential) => {
        const user = credential.user;
        if (!user) {
          console.log("something wrong")
        } else {
          console.log(user);

          console.log("User")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const returningUser = (e) => {
    e.preventDefault()
    const userRef = signInWithEmailAndPassword(auth, email, password)
    userRef.then((credential) => {
        const user = credential.user
        if (!user) {
            console.log("something went wrong")
        } else {
            console.log(user)
            console.log(user.email)
        }
    })
  }

  const toggleSwitch = (e) => {
    e.preventDefault()
    setAuthToggle(prev => !prev)
  }

  return (
    <Wrapper>
      <Header title="Authentication" />
      <Form onSubmit={newUser} action="" color="#44444475">
        <Input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          width="25%"
          mx="8px"
        />
        <Input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          width="20%"
          mx="8px"
        />
        <Button style={{ marginLeft: 8 }} width=" 15%" type="submit">
          <ButtonText  color="#e8e8e8" transform="uppercase">
            {authToggle ? "Create User" : "Login"}
          </ButtonText>
        </Button>
        <p onClick={toggleSwitch}>{!authToggle ? "Sign up" : "Login"}</p>
      </Form>
    </Wrapper>
  );
}
