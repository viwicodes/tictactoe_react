import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

function Reset({ status }) {
  return (
    <>
      <div className="gameContainer">
        <div className="res">
          <h1>{status}</h1>
          <br />
          <br />
          <img
            src="./giphy.gif"
            alt="pic"
            onClick={() => {
              window.location.reload();
            }}
          />
          <br />
          <br />
        </div>
      </div>
      <h3 style={{ textAlign: "center", color: "white" }}>
        Tap SquidWard to play again
      </h3>
    </>
  );
}

function Square({ value, onClick }) {
  return (
    <button className="box boxtext" onClick={onClick}>
      {value}
    </button>
  );
}

function Game({ winner, getStatus, renderSquare }) {
  return (
    <>
      <div className="gameInfo">
        <h1>Let's play TicTacToe</h1>
      </div>
      <div className="gameContainer">
        <div className="container">
          <div className="line"></div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="info">
        <span>{getStatus()}</span>
      </div>
      
    </>
  );
}

function Main() {
  const [next, setNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  const who = next ? "X" : "O";

  function getStatus() {
    if (winner) {
      return winner + " beat " + who;
    } else if (isBoardFull(squares)) {
      return "That's a draw match!";
    } else {
      return "Next turn " + who;
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const newSquares = squares.slice();
          newSquares[i] = who;
          setSquares(newSquares);
          setNext(!next);
        }}
      />
    );
  }

  return (
    <>
      {winner || isBoardFull(squares) ? (
        <Reset status={getStatus()} />
      ) : (
        <Game
          winner={winner}
          getStatus={getStatus}
          renderSquare={renderSquare}
        />
      )}
    </>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
