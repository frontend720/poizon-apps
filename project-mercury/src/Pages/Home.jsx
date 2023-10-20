/* eslint-disable no-unused-vars */
import React from "react";
import { Wrapper, Heading, Body, Button } from "../StyleSheet";
import earth from "../assets/home/background-home-desktop.jpg";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar";

export default function Home() {
  return (
    <Wrapper image={earth} padding="165px">
        {/* <Navbar /> */}
      <div
        style={{
          position: "absolute",
          width: "80%",
          bottom: 0,
          marginBottom: 125,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Body opacity=".75" size="28px" spacing="4.75px">
              SO, YOU WANT TO TRAVEL TO
            </Body>
            <Heading margin="24px 0px">Space</Heading>
            <Body
              spacing="1.25px"
              height="32px"
              size="18px"
              opacity=".75"
              style={{ width: "444px" }}
            >
              Let’s face it; if you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we’ll give you a truly out of
              this world experience!
            </Body>
          </div>
          <Button style={{ marginTop: 60 }}>
            <Body
              spacing="2px"
              transform="uppercase"
              size="32px"
              color="#000000"
            >
                <Link to="/destinations" style={{color: "#000000"}}>
                
              Explore
                </Link>
            </Body>
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
