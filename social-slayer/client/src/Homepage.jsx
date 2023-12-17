import React from "react";
import {
  Wrapper,
  Container,
  Heading,
  InputContainer,
  Input,
  Form,
} from "./Stylesheet";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <Wrapper display="grid" columns="5% 2fr 25%" color="#F0ECE5">
      <Container color="#444">
        <header
          style={{
            width: "5%",
            height: 75,
            background: "#e8e8e8",
            margin: "0px !important",
            position: "absolute",
            top: 0,
            left: 0,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#444444" }}>f</h1>
        </header>
        <div className="icon_container">
          <span className="material-symbols-outlined nav_icons filled-icon">
            home
          </span>
          <Link to="/assistant">
            <span className="material-symbols-outlined nav_icons">
              smart_toy
            </span>
          </Link>
          <Link to="/messages">
            <span className="material-symbols-outlined nav_icons">chat</span>
          </Link>
          <Link to="/account">
            <span className="material-symbols-outlined nav_icons">person</span>
          </Link>
        </div>
      </Container>
      <Container color="#e8e8e8">
        <InputContainer>
          <Heading color="dimgrey">Home</Heading>
          <span style={{ color: "dimgrey" }} class="material-symbols-outlined">
            home
          </span>
        </InputContainer>
        <Form action="">
          <Input type="text" />
          <span
            style={{ color: "mediumslateblue", paddingLeft: 16 }}
            class="material-symbols-outlined input-icon"
          >
            send
          </span>
        </Form>
      </Container>
      <Container color="#444"></Container>
    </Wrapper>
  );
}
