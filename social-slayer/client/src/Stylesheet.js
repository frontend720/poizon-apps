import styled from "styled-components";

const Wrapper = styled.div`
  display: ${({ display }) => (display ? display : "block")};
  grid-template-columns: ${({ columns }) => (columns ? columns : "none")};
  /* background: ${({ color }) => (color ? color : "#444444")}; */
  width: 100%;
  position: fixed;
  height: 100vh
  `;

const Container = styled.div`
    /* background-color: ${({ color }) => (color ? color : "#444444")}; */
    height: ${({height}) => height ? height : "100vh"};
    font-family: Tahoma, "Trebuchet MS", sans-serif;
    padding: ${({padding}) => padding ? padding : "16px"};
    /* position: ${({position}) => position ? position : " relative"}; */
    width: ${({width}) => width ? width : "auto"};
    overflow-y: scroll;
    padding-bottom: 80px !important
`
const ScrollContainer = styled.div`
    background: ${({background})=> background ? background  : "#e8e8e8"};
    width: 100%;
    padding: 16px;
    /* position: scroll; */
    height: 100%
`

const Heading = styled.h3`
    color: ${({color}) => color ? color : "#444444"}
`

const Input = styled.input`
    width: ${({width}) => width ? width : "100%"};
    padding: 10px;
    border-radius: 10px;
    border-color: #444444;
    border-width: 4px;
    font-size: 16px;
    margin: 16px 0px 
`
const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    position: fixed;
    bottom: 0
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between
`

export { Wrapper, Container, Heading, Form, Input, InputContainer, ScrollContainer };
