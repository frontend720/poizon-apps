import React from "react";
import { Wrapper, Container, Heading, InputContainer, Input, Form  } from "./Stylesheet";
import { Link } from "react-router-dom";

export default function Assistant() {
  return (
    <Wrapper display="grid" columns="5% 2fr 25%">
      <Container color="#444444">
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
          <h1 style={{ color: "#444444" }}>ai</h1>
        </header>
        <div className="icon_container">
        <Link to="/">
          <span className="material-symbols-outlined nav_icons">home</span>
        </Link>
        <span className="material-symbols-outlined nav_icons filled-icon">smart_toy</span>
        <Link to="/messages">
          <span className="material-symbols-outlined nav_icons">
            chat
          </span>
        </Link>
        <Link to="/account">
          <span className="material-symbols-outlined nav_icons">person</span>
        </Link>
        </div>
      </Container>
      <Container color="#ededed">
      <Heading>     <InputContainer>
          <Heading color="dimgrey">Alloy</Heading>
          <span style={{ color: "dimgrey" }} class="material-symbols-outlined">
            smart_toy
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
        </Form></Heading>
      </Container>
      <Container color="#444444"></Container>
    </Wrapper>
  );
}
