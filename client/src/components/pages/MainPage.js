import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextInput from "../commons/TextInput";
import Button from "../commons/Button";
import { startGame } from "../../actions/game";

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
    font-family: "Fredoka One";
    font-size: 40px;
    margin: 0 0 30px;
  }
`;

const MainPage = props => {
  const { startGame } = props;
  const [username, setUsername] = useState("");

  const handleStartGame = () => {
    startGame(username);
  };

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  return (
    <Wrapper>
      <h1>BLACKJACK</h1>
      <TextInput
        placeholder="Please Enter Username..."
        onChange={handleUsername}
      />
      <Button onClick={handleStartGame}>Start</Button>
      <Button>Leaderboard</Button>
    </Wrapper>
  );
};

const mapDispatchToProps = dispatch => ({
  startGame: username => dispatch(startGame(username))
});

export default connect(null, mapDispatchToProps)(MainPage);
