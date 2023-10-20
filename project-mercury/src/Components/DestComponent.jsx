/* eslint-disable react/prop-types */
import { FlexContainer, Body, Title } from "../StyleSheet";

export default function DestComponent({name, image, description}) {
  return (
    <FlexContainer>
      <div>
        <Body>PICK YOUR DESTINATION</Body>
        <img src={image} alt="" />
      </div>
      <div>
        <Title color="white">{name}</Title>
        <Body>{description}</Body>
      </div>
    </FlexContainer>
  );
}
