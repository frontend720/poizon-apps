import React from "react";
import { Wrapper, Container } from "./Stylesheet";
import {Link} from "react-router-dom"

export default function Account() {
  return (
    <Wrapper display="grid" columns="5% 2fr 25%">
      <Container color="#444444">
      <Link to="/">
          <span className="material-symbols-outlined nav_icons">home</span>
        </Link>
        <Link to="/assistant">
        <span className="material-symbols-outlined nav_icons ">smart_toy</span>
        </Link>
        <Link to="/messages">
          <span className="material-symbols-outlined nav_icons">
            chat
          </span>
        </Link>
          <span className="material-symbols-outlined nav_icons filled-icon">person</span>
      </Container>
      <Container color="#ededed"></Container>
      <Container color="#444444"></Container>
    </Wrapper>
  );
}
