import styled from "styled-components";

const theme = {
  light: {
    primary: "#F5F5F5",
    secondary: "#FFFFFF",

    tertiary: "#121212",
    quatenary: "#333333",
  },
  dark: {
    primary: "#121212",
    secondary: "#333333",

    tertiary: "#e0e0e0",
    quatenary: "#ffffff",
  },
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.primary};
  padding: ${({padding}) => padding ? padding : "0px"};
  position: ${({position}) => position ? position : "relative"}
`;

const Button = styled.button`
  padding: ${({ padding }) => (padding ? padding : "4px")};
  color: ${(props) => props.theme.tertiary};
  border-color: ${({ border_color }) => (border_color ? border_color : "none")};
  border-width: ${({ width }) => (width ? width : "2px")};
  border-style: solid;
  background: ${({ color }) => (color ? color : "none")};
  border-radius: ${({ radius }) => (radius ? radius : "none")};
  margin: 24px;
  position: ${({ position }) => (position ? position : "static")};
  width: 60px
`;

const Text = styled.h1`
  color: ${(props) => props.theme.quatenary};
  font-size: ${({ size }) => (size ? size : "20px")};
  font-weight: ${({ weight }) => (weight ? weight : "300")};
  text-transform: ${({transform}) => transform ? transform : "capitalize"};
  text-align: ${({align}) => align ? align : "left"}
`;

const lightText = {
  color: "#333333",
  position: "absolute",
  top: 0,
  zIndex: 1,
  padding: 32,
};

const darkText = {
  color: "#ffffff",
  position: "absolute",
  top: 0,
  zIndex: 1,
  padding: 32,
};

const Card = styled.div`
    position: ${({position}) => position ? position : "relative"};
    background-color: none;
    height: ${({height}) => height ? height : "100%"};
    width: ${({width}) => width ? width : "100%"};
    margin-top: 48px

`

const CharacterInput = styled.input`
    width: 50px;
    border: 2px solid black
`

export { Container, theme, Button, Text, lightText,darkText, Card, CharacterInput };
