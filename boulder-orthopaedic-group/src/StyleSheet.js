import styled from "styled-components"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: scroll;
    background: ${({color}) => color ? color : " #ffffff"};
    padding: ${({padding}) => padding ? padding : 0};
    font-family: 'Ubuntu', sans-serif
`

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    padding: ${({padding})=> padding ? padding : "12px 0px"};
    color: ${({color})=> color ? color : "#444444"};
    font-size: ${({size}) => size ? size : "38px"}
    
`

const SubHeading = styled.h4`
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: ${({margin})=> margin ? margin : "0px"};
    color: ${({color}) => color ? color : "#444444"}
`

const Text = styled.p`
line-height: 22px;
letter-spacing: .25px;
padding: ${({padding}) => padding ? padding : "0px"};
font-weight: ${({weight})=> weight ? weight : "normal"};
text-align: ${({align})=> align ? align : "left"};
font-size: ${({size}) => size ? size : "18px"};
color: #444444
`

export {Wrapper, Title, SubHeading, Text}