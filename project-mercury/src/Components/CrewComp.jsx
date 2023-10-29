/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Image,
  Heading,
  Body,
  StatsContainer,
  FlexContainer,
  Container
} from "../StyleSheet";

export default function CrewComp({ name, bio, image }) {
  return (
    <FlexContainer
      justify="space-between"
      padding="150px 150px 0px 150px"
      m_padding="50px 0px"
      top="100px"
    >
      <Container>
        <Body size="32px">MISSION SPECIALIST</Body>
        <Heading margin="18px 0px" size="56px">
          {name}
        </Heading>
        <Body style={{ width: 450 }} size="18px" height="36px">
          {bio}
        </Body>
      </Container>
      <Image  image={image} dimensions="500px" />
    </FlexContainer>
  );
}
