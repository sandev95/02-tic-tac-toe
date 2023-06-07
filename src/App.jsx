import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

import { Square } from "./components/Square";
import { TURN } from "./constants/Constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/Winner";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURN.X;
  });

  //true = winner / false = empate / null = no hay ganador todavia
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  const updateBoard = (index) => {
    //para no sobreescribir la posicion si ya existe
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    //guardar partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

    //revisar si hay ganador o si es un empate
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
