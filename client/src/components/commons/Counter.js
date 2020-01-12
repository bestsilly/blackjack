import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Circle } from "../../assets/circle.svg";

const CounterWrapper = styled.div`
  margin-left: 25px;
  margin-top: 25px;
`;
const CountdownWrapper = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  text-align: center;
  background-color: #fff;
  border-radius: 40px;

  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    transform: rotateY(-180deg) rotateZ(-90deg);
    circle {
      stroke-dasharray: 113px;
      stroke-dashoffset: 0px;
      stroke-linecap: round;
      stroke-width: 4px;
      stroke: #009688;
      fill: none;
      animation: countdown 10s linear infinite forwards;
    }
  }
  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }
    to {
      stroke-dashoffset: 113px;
    }
  }
`;
const CountdownNumber = styled.div`
  color: #009688;
  display: inline-block;
  font-weight: bold;
  line-height: 40px;
`;

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Countdown = ({timeout}) => {
  const [countdown, setCountdown] = useState(10);

  useInterval(() => {
    setCountdown(countdown - 1);
    if(countdown == 0) {
      timeout();
      setCountdown(9);
    }
  }, 1000);

  return (
    <CountdownWrapper>
      <CountdownNumber>{countdown}</CountdownNumber>
      <svg>
        <circle r="18" cx="20" cy="20"></circle>
      </svg>
    </CountdownWrapper>
  );
};

const Counter = ({ timeout }) => (
  <CounterWrapper>
    <Countdown timeout={timeout} />
  </CounterWrapper>
);

export default Counter;
