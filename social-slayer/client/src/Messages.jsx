import React from "react";
import { Wrapper, Container } from "./Stylesheet";
import { Link } from "react-router-dom";
import Announcement from "./Announcement";

export default function Messages() {
  return (
    <Wrapper display="grid" columns="10% 1fr">
      <Container color="#444444">
        <header
          style={{
            width: "10%",
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
      <Container color="#ededed">
        <Announcement
          text="Get ready to laugh and learn like never before! The collaborative AI
        assistant is coming soon, ready to unlock a world of boundless knowledge
        and delightful conversations. Subscribe now and be among the first to
        experience limitless possibilities!"
        />
      </Container>
    </Wrapper>
  );
}
