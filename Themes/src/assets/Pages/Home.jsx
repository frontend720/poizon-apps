import { useState, useEffect } from "react";
import ThemeToggle from "../../Components/ThemeToggle";
import {
  Container,
  Text,
  theme,
  lightText,
  darkText,
  Card,
} from "../../StyleSheet";
import { ThemeProvider } from "styled-components";
import words from "../../data";
import { preview } from "vite";

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [character, setCharacter] = useState("a");

  //   const item = words[0]

  //   console.log(item)

  const id = Math.floor(Math.random() * 29) / 1;
  const answer = words[id];
  answer.word.replace('"', "_");

  const format = JSON.stringify(answer.word.replace('"', "_"));
  const defFormat = JSON.stringify(answer.definition);

  const toggle = () => {
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  //   useEffect(() => {
  //     const callback = () => {
  //       setInputLength((prevState) => {
  //         return [...prevState, newWord];
  //       });
  //     };

  //     callback();
  //   }, []);

  useEffect(() => {
    for (let i = 0; i < newWord.length; i++) {
      setInputLength((prevState) => {
        return [...prevState, newWord];
      });
    }
  }, []);

  const formatted = format.replaceAll('"', "");
  const noStr = defFormat.replaceAll('"', "");
  const [newWord, setNewWord] = useState(formatted);
  const [newDef, setNewDef] = useState(noStr);
  const [inputLength, setInputLength] = useState([]);

  //   const splitChar = newDef.split("")

  //   console.log(splitChar)
  console.log(newWord);

  console.log(inputLength);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container position="fixed">
        <div style={{ position: "absolute", zIndex: 1, height: "auto" }}>
          <ThemeToggle click={toggle} />
        </div>
        <Card style={!currentTheme === "light" ? lightText : darkText}>
          <Text align="center" size="24px" weight="600" transform="uppercase">
            Sweet Sundae Mystery
          </Text>
          <Text
            style={{ fontFamily: "", letterSpacing: 8, width: "100%" }}
            transform="uppercase"
            align="center"
            size="48px"
          >
            {newWord}
          </Text>
          <Text align="center">{newDef}</Text>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
