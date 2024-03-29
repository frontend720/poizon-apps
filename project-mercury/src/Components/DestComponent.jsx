/* eslint-disable react/prop-types */
import { FlexContainer, Body, Title, Image } from "../StyleSheet";

export default function DestComponent({ name, image, description }) {
  return (
    <FlexContainer className="flex_container">
      <div>
        <Body>PICK YOUR DESTINATION</Body>
        <Image image={image} display="block" alt="" />
      </div>
      <div>
        <Title color="white">{name}</Title>
        <Body>{description}</Body>
      </div>
    </FlexContainer>
  );
}
