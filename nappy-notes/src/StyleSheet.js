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
`

export {List, ListItem, EditContainer}