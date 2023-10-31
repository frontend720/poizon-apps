import styled from "styled-components"

const List = styled.ul`
    list-style: ${({type}) => type ? type : "none"}
`

const ListItem = styled.li`
    border: ${({border}) => border ? border : "2px solid black"};
    padding: 6px;

`

export {List, ListItem}