import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Card from "../commons/Card";
import Button from "../commons/Button";
import { isEmpty } from "lodash";

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

const Logo = styled.div`
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

const StatusText = styled.p`
  font-weight: bold;
  font-size: 40px;
  margin: 15px 0;
  height: 50px;
`;

const ScoreBadge = styled.p`
  position: absolute;
  z-index: 1;
  right: -15px;
  top: -55px;
  font-size: 40px;
  font-weight: bold;
`;

const BlackjackPage = ({ game }) => (
  <Wrapper>
    <Header>
      <Logo></Logo>
      <h1>BLACKJACK</h1>
      <Username>
        <p>{game.username}</p>
      </Username>
    </Header>
    <GameZone>
      <CardWrapper>
        {isEmpty(game.computerCard) ? (
          <>
            <Card closed={true} />
            <Card closed={true} />
          </>
        ) : (
          <>
            {game.computerCard.map((item, index) => (
              <Card key={index} Value={item.Value} />
            ))}
          </>
        )}
      </CardWrapper>
      <StatusText></StatusText>
      <CardWrapper>
        {!isEmpty(game.playerCard) && (
          <ScoreBadge>
            {game.playerCard.reduce((acc, obj) => acc + obj.Weight, 0)}
          </ScoreBadge>
        )}
        {game.playerCard.map((item, index) => (
          <Card key={index} Value={item.Value} />
        ))}
      </CardWrapper>
      <ButtonsWrapper>
        <Button>HIT</Button>
        <Button>STAND</Button>
      </ButtonsWrapper>
    </GameZone>
  </Wrapper>
);

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps)(BlackjackPage);
