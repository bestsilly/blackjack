import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Card from "../commons/Card";
import Button from "../commons/Button";
import { isEmpty } from "lodash";
import { hitMe, stand, exit } from "../../actions/game";
import Counter from "../commons/Counter";

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;

  h1 {
    font-family: "Fredoka One";
    color: #009688;
    text-align: center;
    width: 33.33%;
  }
`;

const LeftAsset = styled.div`
  width: 33.33%;
`;

const Username = styled.div`
  width: 33.33%;
  p {
    padding: 15px 30px;
    text-align: right;
    font-weight: bold;
  }
`;

const GameZone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ButtonsWrapper = styled.div`
  margin-top: 60px;
  button {
    margin: 0 15px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 60px;
  position: relative;
`;

const StatusWrapper = styled.p`
  font-weight: bold;
  font-size: 40px;
  margin: 30px 0;
  color: #009688;
  height: 50px;
  position: relative;
  span {
    padding: 10px 15px;
    position: absolute;
    top: -30px;
    right: -75px;
    font-size: 16px;
    font-weight: bolder;
    background-color: #f44336;
    border-radius: 60px;
    color: #fff;
    transform: rotate(30deg);
  }
`;

const ScoreBadge = styled.p`
  position: absolute;
  z-index: 1;
  right: -15px;
  top: -55px;
  font-size: 40px;
  font-weight: bold;

  ${({ loser }) =>
    loser &&
    `&:after {
    content: '';
    opacity: 0.7;
    position: absolute;
    display: block;
    top: 40%;
    left: -10%;
    width: 120%;
    height: 4px;
    border-radius: 2px;
    background-color: #f44336;
    }`}
`;

const BlackjackBadge = styled.span`
  padding: 10px 15px;
  position: absolute;
  top: 15px;
  right: -18px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: bolder;
  background-color: #f44336;
  border-radius: 60px;
  color: #fff;
  transform: rotate(30deg);
`;

const BlackjackPage = ({ game, hitMe, stand, exit, history }) => {
  const handleHitMe = () => {
    hitMe(game.username);
  };

  const handleStand = () => {
    stand(game.username);
  };

  const handleExit = () => {
    exit();
  };

  const pointsSummary = array => {
    const value = array.reduce((acc, obj) => acc + obj.Weight, 0);
    if (value === 21) {
      return <BlackjackBadge>Blackjack !!</BlackjackBadge>;
    } else {
      return value;
    }
  };

  useEffect(() => {
    if (game.username === "") {
      history.push("/");
    }
  }, [game.username, history]);

  return (
    <Wrapper>
      <Header>
        <LeftAsset>
          <Counter timeout={handleHitMe} />
        </LeftAsset>
        <h1>BLACKJACK</h1>
        <Username>
          <p>{game.username}</p>
        </Username>
      </Header>
      <GameZone>
        <CardWrapper>
          {isEmpty(game.computerCards) ? (
            <>
              <Card closed={true} />
              <Card closed={true} />
            </>
          ) : (
            <>
              <ScoreBadge loser={game.winner !== "Computer"}>
                {pointsSummary(game.computerCards)}
              </ScoreBadge>
              {game.computerCards.map((item, index) => (
                <Card key={index} Value={item.Value} />
              ))}
            </>
          )}
        </CardWrapper>
        <StatusWrapper>
          {game.winner && game.winner !== "Draw" ? (
            <>
              {game.winner} Win!{game.isTimeout && <span>Time Out</span>}
            </>
          ) : game.winner === "Draw" ? (
            "Draw"
          ) : (
            ""
          )}
        </StatusWrapper>
        <CardWrapper>
          {!isEmpty(game.playerCards) && (
            <ScoreBadge loser={game.winner === "Computer"}>
              {pointsSummary(game.playerCards)}
            </ScoreBadge>
          )}
          {game.playerCards.map((item, index) => (
            <Card key={index} Value={item.Value} />
          ))}
        </CardWrapper>
        <ButtonsWrapper>
          {game.winner ? (
            <Button onClick={handleExit}>EXIT</Button>
          ) : (
            <>
              <Button onClick={handleHitMe}>HIT</Button>
              <Button onClick={handleStand}>STAND</Button>
            </>
          )}
        </ButtonsWrapper>
      </GameZone>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  game: state.game
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  hitMe: username => dispatch(hitMe(username)),
  stand: username => dispatch(stand(username)),
  exit: () => dispatch(exit(ownProps))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlackjackPage)
);
