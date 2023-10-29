/* eslint-disable react/prop-types */
import React from "react";
import { FlexContainer, Heading, Body, Image, TabletImage } from "../StyleSheet";

export default function TechComponent({ vehicle, description, image, alt, tablet_image }) {
  return (
    <>
    <FlexContainer style={{justifyContent: "space-around", paddingTop: 200}}>
      <div>
      <TabletImage margin="24px 0px" padding="32px 0px" image={tablet_image} style={{width: "100%", height: 300}} alt={alt} />
        <Body tablet_align="start" spacing="2.5px">THE TECHNOLOGY...</Body>
        <Heading style={{padding: "16px 0px"}} size="56px">{vehicle}</Heading>
      {/* <img src={tablet_image} alt="" /> */}
        <Body tablet_width="600px" size="18px" width="400px" style={{ lineHeight: 2}}>{description}</Body>
      </div>
      <Image display="none" style={{ width: 400, height: 500 }} image={image} alt={alt} />
    </FlexContainer>
    </>
  );
}
