import React from "react";
import styled from "styled-components";

const TextInputWithStyled = styled.input`
  font-family: "Comfortaa", cursive;
  background-color: transparent;
  text-align: center;
  position: relative;
  font-weight: bold;
  font-size: 20px;
  width: 230px;
  border: 0;
  &::placeholder {
    font-weight: bold;
    color: #8ac6d1;
    font-size: 18px;
    opacity: 1;
  }
  &:active,
  &:focus {
    outline: 0;
  }
  &:after {
    background-color: #8ac6d1;
    position: absolute;
    content: "";
    width: 100%;
    height: 4px;
  }
`;

const TextInput = props => <TextInputWithStyled {...props} />;

export default TextInput;
