import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ReactComponent as Circle } from "../../assets/circle.svg";
import { tick } from "../../actions/game";

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
      animation: countdown 10.2s linear;
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

const Counter = ({ timeout, timeLeft, tick }) => {

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      timeout();
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  return (
    <CounterWrapper>
      <CountdownWrapper>
        <CountdownNumber>{timeLeft}</CountdownNumber>
        <Circle />
      </CountdownWrapper>
    </CounterWrapper>
  );
};

const mapStateToProps = state => ({
  timeLeft: state.game.timeLeft
});

const mapDispatchToProps = dispatch => ({
  tick: () => dispatch(tick())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
