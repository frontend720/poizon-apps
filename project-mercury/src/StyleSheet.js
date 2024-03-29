import styled from "styled-components";


const Wrapper = styled.div`
  width: 100vw;
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
  @media (max-width: 1190px) {
    text-align: center;
    width: 100%;
  }
  @media (max-width: 490px){
    font-size: ${({ m_size }) => (m_size ? m_size : "56px")}; 
    
  }
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
  padding: ${({ padding }) => (padding ? padding : 0)};
  width: ${({ width }) => (width ? width : 0)};
  @media (max-width: 1190px) {
    /* text-align: center; */
    margin: 0px auto;
    width: 600px;
    text-align: ${({ tablet_align }) =>
      tablet_align ? tablet_align : "center"};
    width: ${({ tablet_width }) => (tablet_width ? tablet_width : "100%")};
    font-size: 15px
  };
  @media (max-width: 490px){
    width: ${({m_width}) => m_width ? m_width : "100%"};
    margin: 0px;
  }
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
  margin-top: 70px;
  @media (max-width: 685px){
    flex-direction: column;
    margin-top: 0px;
    height: 100vh;
    line-height: 58px;
    padding-top: 150px;
    display: ${({view}) => view ? view : "none"}
  }
`;
const NavLink = styled.li`
  color: #ffffff;
  list-style: none;
  text-transform: uppercase;
  padding: 0px 25px;
  letter-spacing: 2px;
`;

const FlexContainer = styled.div`
  display: flex;
  padding: ${({ padding }) => (padding ? padding : "0px")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
  position: static;
  width: ${({width}) => width ? width : "100vw"};
  margin-top: ${({top}) => top ? top : "0px"};
  flex-direction: row;
  @media (max-width: 1190px) {
    flex-direction: column;
    justify-content: center;
    /* position: fixed; */
    padding: ${({m_padding}) => m_padding ? m_padding : "0px"};
    width: 100%;
    margin: 0px auto;
    display: block;
    
   
  }
`;

const Image = styled.div`
  background-image: url(${({ image }) => (image ? image : "none")});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: ${({ dimensions }) => (dimensions ? dimensions : "250px")};
  width: ${({ dimensions }) => (dimensions ? dimensions : "250px")};
  border: none !important;
  @media (max-width: 1190px) {
    margin: 0 auto;
    display: ${({display}) => display  ? display : "block" };
    margin-bottom: 24px
  }
  @media (max-width: 490px){
    width: 250px;
    height: 250px
  }
`;

const TabletImage = styled.div`
  display: none;
  @media (max-width: 1190px) {
    margin: ${({margin}) => margin ? margin : "0px auto"};
    background-image: url(${({ image }) => (image ? image : "none")});
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: block;
    padding: ${({padding}) => padding ? padding : 0}
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 75%;
  @media (max-width: 1190px) {
    margin: 0 auto;
  }
`;

const NavIcons = styled.img`
  src: url(${({icon}) => icon ? icon : "none"});
  width: 24px;
  position: absolute;
  right: 0;
 margin-right: 30px;
 display: none;
 @media (max-width: 680px){
   display: ${({display}) => display ? display : "block"};
   z-index: 3;
    margin-top: ${({top}) => top ? top : 30}
 };
 
`

const Container = styled.div`
  margin-top: ${({top}) => top ? top : "150px"};
  @media (max-width: 490px){
    margin-top: 0px
  }
`

export {
  Wrapper,
  Heading,
  Body,
  Button,
  Nav,
  NavLink,
  FlexContainer,
  Image,
  StatsContainer,
  TabletImage,
  NavIcons,
  Container
};
