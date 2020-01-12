import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";

const BoardWrapper = styled.div``;
const Header = styled.div`
  h1 {
    font-family: "Fredoka One";
    color: #009688;
    text-align: center;
  }
`;
const TableWrapper = styled.div`
  width: 80%;
  max-width: 600px;
  margin: auto;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
  h2 {
    text-align: center;
    margin-top: 0;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse:separate; 
  border-spacing: 0;
  tr {
    th {
      text-align: center;
      padding: 10px 0;
      color: #fff;
      &:nth-child(1) {
        width: 8%;
        text-align: center;
      }
      &:nth-child(2) {
        width: 70%;
        text-align: left;
      }
    }
    td {
      font-weight: bold;
      padding: 10px 0;
      &:nth-child(1) {
        text-align: center;
      }
      &:nth-child(3) {
        text-align: center;
      }
    }
    &.t-header {
      background-color: #009688;
    }
    &:nth-child(even) {
      background-color: #bbded6b0;
    }
  }
`;
const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:5051/api/leaderboard`)
      .then(res => {
        console.log(res);
        setLeaderboard(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <BoardWrapper>
      <Header>
        <h1>BLACKJACK</h1>
      </Header>
      <TableWrapper>
        <h2>Leaderboard</h2>
        <Table>
          <thead>
            <tr className="t-header">
              <th>No.</th>
              <th>Name</th>
              <th>Win / Loss</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.player}</td>
                <td>
                  {item.winner !== "Computer"
                    ? "Win"
                    : item.winner !== "Draw"
                    ? "Loss"
                    : "Draw"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </BoardWrapper>
  );
};

export default LeaderboardPage;
