import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TextInput from "../commons/TextInput";
import Button from "../commons/Button";
import { startGame, reinitTimer, clearState } from "../../actions/game";

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
  const { startGame, reinitTimer, clearState } = props;
  const [username, setUsername] = useState("");

  const handleStartGame = () => {
    startGame(username);
  };

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    reinitTimer();
    clearState();
  }, [reinitTimer]);

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  startGame: username => dispatch(startGame(username, ownProps)),
  reinitTimer: () => dispatch(reinitTimer()),
  clearState: () => dispatch(clearState())
});

export default connect(null, mapDispatchToProps)(MainPage);
