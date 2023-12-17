import styled from "styled-components";

const Wrapper = styled.div`
  display: ${({ display }) => (display ? display : "block")};
  grid-template-columns: ${({ columns }) => (columns ? columns : "none")};
  background: ${({ color }) => (color ? color : "#444444")};
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
    background-color: ${({ color }) => (color ? color : "#ffffff")};
    height: ${({height}) => height ? height : "100vh"};
    font-family: Tahoma, "Trebuchet MS", sans-serif;
    padding: ${({padding}) => padding ? padding : "16px"}
`

const Heading = styled.h3`
    color: ${({color}) => color ? color : "#444444"}
`

const Input = styled.input`
    width: ${({width}) => width ? width : "100%"};
    padding: 10px;
    border-radius: 10px;
    border-color: #444444;
    border-width: 1px;
    font-size: 16px
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
`

export { Wrapper, Container, Heading, Form, Input, InputContainer };
