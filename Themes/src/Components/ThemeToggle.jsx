import {useState} from "react"
import { Button, Container, theme } from "../StyleSheet";
import { ThemeProvider } from "styled-components";

import {BsFillMoonFill,BsSunFill} from "react-icons/bs"

const ThemeToggle = (props) => {
    const [currentTheme, setCurrentTheme] = useState("light");

    const themeToggle = () => {
      setCurrentTheme(currentTheme === "light" ? "dark" : "light");
    };
  
    return (
      <ThemeProvider theme={theme[currentTheme]}>
        <Container>
          <Button onMouseDown={props.click}  position="absolute" style={{right: 0}} radius="25px" onClick={themeToggle} color={currentTheme === "light" ? "#333333" : "#87CEEB"}>
            
            {currentTheme === "light" ? <BsFillMoonFill style={{color: "#FEFBEA", marginRight: 25}} size="20px" /> : <BsSunFill style={{color: "orange", marginLeft: 25}} size="20px" />}
            </Button>
        </Container>
      </ThemeProvider>
    )
}

export default ThemeToggle