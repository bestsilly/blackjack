import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Circle } from "../../assets/circle.svg";

const CounterWrapper = styled.div`
  margin-left: 25px;
  margin-top: 25px;
`;
const CountdownWrapper = styled.div`
  position: relative;
  height: 80px;
  width: 80px;
  text-align: center;
  background-color: #fff;
  border-radius: 80px;

  &.animated svg circle {
    animation: countdown 9s linear;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    transform: rotateY(-180deg) rotateZ(-90deg);
    circle {
      stroke-dasharray: 226px;
      stroke-dashoffset: 0px;
      stroke-linecap: round;
      stroke-width: 4px;
      stroke: #009688;
      fill: none;
    }
  }
  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }
    to {
      stroke-dashoffset: 226px;
    }
  }
`;
const CountdownNumber = styled.div`
  color: #009688;
  display: inline-block;
  font-weight: bold;
  font-size: 36px;
  line-height: 80px;
`;

const Counter = ({ timeLeft }) => {
  return (
    <CounterWrapper>
      <CountdownWrapper className={timeLeft <= 9 ? "animated" : ""}>
        <CountdownNumber>{timeLeft}</CountdownNumber>
        <Circle />
      </CountdownWrapper>
    </CounterWrapper>
  );
};

const mapStateToProps = state => ({
  timeLeft: state.game.timeLeft,
  username: state.game.username
});

export default connect(mapStateToProps)(Counter);
