/** @format */

import React, { useEffect, useState } from "react";
import { winningBoard } from "./components/Winner";

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  const [playerTurn, setPlayerTurn] = useState("O");

  const [results, setResults] = useState({ winner: "None", state: "None" });

  useEffect(() => {
    isTie();
    hasWon();

    if (playerTurn === "X") {
      setPlayerTurn("O");
    } else {
      setPlayerTurn("X");
    }
  }, [board]);

  useEffect(() => {
    if (results.state !== "None") {
      alert(`Winner! --> player ${results.winner} has won this game!`);
      restartGame();
    }
  }, [results]);

  const pickSpace = (space) => {
    setBoard(
      board.map((value, index) => {
        if (index === space && value === "") {
          return playerTurn;
        }

        return value;
      })
    );
  };

  const hasWon = () => {
    winningBoard.forEach((currWinningBoard) => {
      const playerOne = board[currWinningBoard[0]];

      if (playerOne === "") return;

      let yesWinner = true;
      currWinningBoard.forEach((index) => {
        if (board[index] !== playerOne) {
          yesWinner = false;
        }
      });

      if (yesWinner) {
        setResults({ winner: playerTurn, state: "Won" });
      }
    });
  };

  const isTie = () => {
    let checked = true;
    board.forEach((space) => {
      if (space === "") {
        checked = false;
      }
    });

    if (checked) {
      setResults({ winner: "No One", state: "Tie" });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayerTurn("O");
  };

  return (
    <div className='container-fluid app__container'>
      <div className='jumbotron'>
        <h1>Play some Tic Tac Toe</h1>
        <p>Have some fun with this game.</p>
      </div>
      <div className='game'>
        {board.map((space, index, board) => {
          return (
            <div onClick={() => pickSpace(index, board)} className='space'>
              <h3 className='symbol'>{space}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
