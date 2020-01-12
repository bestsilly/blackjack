import React from "react";
import styled from "styled-components";

const ButtonWithStyled = styled.button`
  border: 0;
  border-radius: 60px;
  font-size: 20px;
  font-family: "Comfortaa", cursive;
  font-weight: bold;
  width: 230px;
  transition: transform 0.1s cubic-bezier(0, 1.8, 1, 1.8);
  margin-top: 30px;
  padding: 12px 0;
  color: #fff;
  background-color: #009688;
  &:active,
  &:focus {
    outline: 0;
    background-color: #1b736b;
    color: #fff;
    box-shadow: 2px 3px 10px #b9d4d6;
    transform: scale(1.1) rotate(-1deg);
  }

  &:hover {
    box-shadow: 2px 3px 10px #b9d4d6;
    transform: scale(1.1) rotate(-1deg);
  }
`;

const Button = props => (
  <ButtonWithStyled {...props}>{props.children}</ButtonWithStyled>
);

export default Button;
