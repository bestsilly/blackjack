import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/poker.svg";
import { ReactComponent as CardBackLogo } from "../../assets/cardback.svg";
const CardWithStyled = styled.div`
  width: 120px;
  height: 160px;
  background-color: #fff;
  border-radius: 16px;
  border: 5px solid #bbded6;
  position: relative;
  margin-left: -60px;
`;

const CardNumber = styled.span`
  display: block;
  font-size: 30px;
  font-weight: bold;
  padding: 15px;
`;

const CardLogo = styled(Logo)`
  width: 70%;
  margin-top: 8px;
  position: relative;
  left: 15%;
  top: -15px;
`;

const CardBack = styled(CardBackLogo)`
    width: 100%;
    height: 100%;
`;

const Card = ({ closed, Value }) => (
  <CardWithStyled closed>
    {closed ? (
      <CardBack />
    ) : (
      <>
        <CardNumber>{Value}</CardNumber>
        <CardLogo />
      </>
    )}
  </CardWithStyled>
);

export default Card;
