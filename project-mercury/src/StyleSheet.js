import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ color }) => (color ? color : "#ffffff")};
  padding: ${({ padding }) => (padding ? padding : "16px")};
  background-image: url(${({ image }) => (image ? image : "none")});
  position: ${({ position }) => (position ? position : "relative")};
  z-index: ${({ index }) => (index ? index : 0)};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Heading = styled.h1`
  font-family: "Bellefair", serif;
  font-size: ${({ size }) => (size ? size : "150px")};
  color: ${({ color }) => (color ? color : "#ffffff")};
  text-transform: uppercase;
  margin: ${({ margin }) => (margin ? margin : "auto")};
`;

const Body = styled.p`
  color: ${({ color }) => (color ? color : "#d0d6f9")};
  font-family: Barlow Condensed;
  font-size: ${({ size }) => (size ? size : "16px")};
  letter-spacing: ${({ spacing }) => (spacing ? spacing : "normal")};
  line-height: ${({ height }) => (height ? height : "normal")};
  font-style: normal;
  opacity: ${({ opacity }) => (opacity ? opacity : 1)};
  text-transform: ${({ transform }) => (transform ? transform : "capitalize")};
  padding: ${({padding})=>padding?padding:0}
`;

const Button = styled.button`
  height: ${({ height }) => (height ? height : "274px")};
  width: ${({ width }) => (width ? width : "274px")};
  background: ${({ background }) => (background ? background : "#ffffff")};
  border-radius: 50%;
`;

const Nav = styled.ul`
  display: flex;
  position: absolute;
  z-index: 1;
  padding: 40px 125px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(40.774227142333984px);
  right: 0;
  margin-top: 70px
 
`;
const NavLink = styled.li`
  color: #ffffff;
  list-style: none;
  text-transform: uppercase;
  padding: 0px 25px;
  letter-spacing: 2px
`;

const FlexContainer = styled.div`
    display: flex
`

const Image = styled.div`
background-image: url(${({ image }) => (image ? image : "none")});
/* width: ${({width}) => width ? width : "50%"}; */
/* height: 250px; */
background-size: cover;
background-repeat: no-repeat;
background-position: center;
height: ${({dimensions}) => dimensions ? dimensions : "250px"};
width: ${({dimensions}) => dimensions ? dimensions : "250px"};
border: none !important
`

const StatsContainer = styled.div`
display: flex;
justify-content: space-between;
width: 75%
`

export { Wrapper, Heading, Body, Button, Nav, NavLink, FlexContainer, Image, StatsContainer };
