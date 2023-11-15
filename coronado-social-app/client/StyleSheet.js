import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ color }) => (color ? color : "blue")};
  padding: 16px;
`;

const Form = styled.form`
  background: #ffffffc4;
  padding: 6px;
  margin-top: 48px;
  border-radius: 25px;

`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  font-size: 20px;
  font-weight: 700;
  background: ${({ color }) => (color ? color : "#444444")};
  color: #f8f8f8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-radius: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 20px;
  border: none;
  background: none;
  margin: 12px 0px;
`;

const Textarea = styled.textarea`
  width: 100%;
  background: none;
  margin: 12px 0px;
  border: none;
  padding: 3px;
  font-size: 20px;
`;
export { Wrapper, Button, Input, Textarea, Form };
