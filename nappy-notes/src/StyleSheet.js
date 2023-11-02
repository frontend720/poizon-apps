import styled from "styled-components"


const Wrapper = styled.div`
background: ${({color}) => color ? color : "#FAF0E650"};
height: 100vh;
width: 100%
`

const List = styled.ul`
    list-style: ${({type}) => type ? type : "none"}
`

const ListItem = styled.li`
    border: ${({border}) => border ? border : "2px solid black"};
    padding: 6px;

`

const EditContainer = styled.div`
    border: .15px solid #44444450;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    background: ${({color})=> color ? color : "#44444425"}
`

const Button = styled.button`
    border: ${({border}) => border ? border : "2px solid #444444"};
    background: ${({background}) => background ? background : "#444444"};
    padding: 6px;
    width: ${({width}) => width ? width : "50%"};
    height: ${({height}) => height ? height : "auto"};
    margin: ${({margin}) => margin ? margin : "auto"};
    display: ${({display}) => display ? display : ""}
`

const ButtonText = styled.label`
    font-weight: ${({weight}) => weight ? weight : "600"};
    font-size: ${({size}) => size ? size : "16px"};
    color: ${({color}) => color ? color : "#444444"};
    text-transform: ${({transform}) => transform ? transform : "Capitalize"}
`

const Head = styled.div`
    background: ${({color}) => color ? color : "#44444475"};
    width: ${({width}) => width ? width : "100%"}
`

const HeaderText = styled.h1`
    padding: ${({padding}) => padding ? padding : "24px"};
    text-transform: ${({transform}) => transform ? transform : "uppercase"};
    font-family: ${({fontFamily}) => fontFamily ? fontFamily : "Russo One"}, sans-serif;
`

const Form = styled.form`
    width: ${({width}) => width ? width : "100%"};
    padding: ${({padding}) => padding ? padding : "8px"};
    background-color: ${({color}) => color ? color : "none"};
    display: ${({align}) => align ? align : "center"}
`

const Input = styled.input`
    font-size: 16px;
    padding: 6px;
    width: ${({width}) => width ? width : "auto"};
    margin-left: ${({mx}) => mx ? mx : "none"};
    margin-right: ${({mx}) => mx ? mx : "none"}
`

export {List, ListItem, EditContainer, Button, ButtonText, Head, HeaderText, Wrapper, Form, Input}