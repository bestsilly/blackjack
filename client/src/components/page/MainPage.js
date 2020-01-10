import React from "react";
import styled from "styled-components";
import TextInput from "../commons/TextInput";
import Button from "../commons/Button";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  > h1 {
      font-weight: bold;
      color: #009688;
      font-family: 'Fredoka One';
      font-size: 40px;
      margin: 0 0 30px;
  }
`;

const MainPage = () => (
  <Wrapper>
    <h1>BLACKJACK</h1>
    <TextInput placeholder="Please Enter Username..."/>
    <Button>
      Start
    </Button>
    <Button>
      Leaderboard
    </Button>
  </Wrapper>
);

export default MainPage;
