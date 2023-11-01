import styled from "styled-components"

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
    width: ${({width}) => width ? width : "50%"}
`

const ButtonText = styled.label`
    font-weight: ${({weight}) => weight ? weight : "600"};
    font-size: ${({size}) => size ? size : "16px"};
    color: ${({color}) => color ? color : "#444444"};
    text-transform: ${({transform}) => transform ? transform : "Capitalize"}
`

export {List, ListItem, EditContainer, Button, ButtonText}