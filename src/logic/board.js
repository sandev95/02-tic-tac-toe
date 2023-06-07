import { WINNER_COMBOS } from "../constants/Constants";

export const checkWinner = (boardToCheck) => {
  //revisa todas las combinaciones ganadoras para ver
  // si gana X o O
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  } //si no hay ganador:
  return null;
};

export const checkEndGame = (newBoard) => {
  //revisamos si no hay mas espacios vacios en el board
  return newBoard.every((square) => square !== null);
};
