import styled from "styled-components";
import { IonItem, IonTextarea } from "@ionic/react";

const Form = styled.form`
  position: absolute;
  bottom: 0;
  width: 90%;
  background: #444444;
  padding: 8px !important;
  font-size: 20px;
`;

const StyledIonItem = styled(IonItem)`
  padding: 6px !important;
  position: absolute;
  bottom: 0;
  width: 100%
`;

const StyledImage = styled.img`
    width: ${({width}) => width ? width : "100%"};
    background-position: center;
    background-repeat: no-repeat
`

const StyledIonTextarea = styled.textarea`
  padding: 8px !important;
  /* background: #444444 !important; */
  font-size: 16px;
  width: 100%;
  margin-right: 8px;
  margin-bottom: 4px;
  bottom: 0;
  background: #ffffffd7;
  border-radius: 10px;
  border: none;
  color: #444444
`;

const DummyText = styled.h1`
font-family: ${({font}) => font ? font : "Arial, Helvetica, sans-serif"};
content: ${({content}) => content ? content : ""};
margin-top: 200px
`


export { Form, StyledIonItem, StyledIonTextarea, StyledImage, DummyText };
