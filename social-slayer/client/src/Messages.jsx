import React from "react";
import { Wrapper, Container } from "./Stylesheet";
import { Link } from "react-router-dom";

export default function Messages() {
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
          <h1 style={{ color: "#444444" }}>m</h1>
        </header>
        <div className="icon_container">

        <Link to="/">
          <span className="material-symbols-outlined nav_icons">home</span>
        </Link>
        <Link to="/assistant">
          <span className="material-symbols-outlined nav_icons ">
            smart_toy
          </span>
        </Link>
        <span className="material-symbols-outlined nav_icons filled-icon">
          chat
        </span>
        <Link to="/account">
          <span className="material-symbols-outlined nav_icons">person</span>
        </Link>
        </div>
      </Container>
      <Container color="#ededed"></Container>
      <Container color="#444444"></Container>
    </Wrapper>
  );
}
