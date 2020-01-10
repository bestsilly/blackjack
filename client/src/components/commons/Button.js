import React from "react";
import styled from "styled-components";

const ButtonWithStyled = styled.button`
  border: 0;
  border-radius: 8px;
  font-size: 20px;
  font-family: "Comfortaa", cursive;
  font-weight: bold;
  width: 230px;
  transition: 0.1s all ease-in;
  margin-top: 30px;
  padding: 12px 0;
  color: #009688;
  &:active,
  &:focus {
    outline: 0;
    background-color: #009688;
    color: #fff;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  &:hover {
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
`;

const Button = props => (
  <ButtonWithStyled {...props}>{props.children}</ButtonWithStyled>
);

export default Button;
