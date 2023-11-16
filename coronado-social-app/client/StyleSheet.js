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
  margin-top: 24px;
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

const Container = styled.div`
  background: #ffffff;
  padding: 16px;
  border-radius: 25px;
  margin-top: 40px;
`;

const Body = styled.p`
  font-family: "Ubuntu", sans-serif;
  font-size: ${({ size }) => (size ? size : "16px")};
  text-align: ${({ align }) => (align ? align : "left")};
  color: ${({ color }) => (color ? color : "#444444")};
`;

const Heading = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 22px;
  text-align: ${({ align }) => (align ? align : "center")};
  color: ${({ color }) => (color ? color : "#444444")};
`;

const AuthInput = styled.input`
  width: 100%;
  font-size: 18px;
  padding: 8px;
  margin-bottom: 20px
`;

export {
  Wrapper,
  Button,
  Input,
  Textarea,
  Form,
  Container,
  Body,
  Heading,
  AuthInput,
};
