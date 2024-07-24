"use client";

import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<any>(null);

  const reset = () => {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0])
    setTurn("X")
    setWinner(null)
  }

  const play = (i) => {
    if (board[i] !== 0) {
      return;
    }
    const newBoard = board;
    newBoard[i] = turn;
    setBoard(newBoard);

    setTurn(turn == "X" ? "O" : "X");

    function check(w) {
      const [x, y, z] = w;
      return board[x] == board[y] && board[y] == board[z] && board[x] == turn;
    }

    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const w of wins) {
      if (check(w)) {
        setWinner(turn);
      }
    }
  };

  return (
    <div className="mx-auto w-[300px] mt-10">
      {winner ? (
        <span className="flex justify-between items-center">
          <h1 className="text-2xl">Winner: {winner}</h1>
          <button onClick={reset} className="ml-4">Play Again</button>
        </span>
      ) : (
        <h1 className="text-2xl">Turn: {turn}</h1>
      )}
      <div className="grid grid-cols-3 w-[300px] border-4 mx-auto mt-10">
        {board.map((b, i) => (
          <button
            key={i}
            className="w-[100px] h-[100px] border-2"
            onClick={() => play(i)}
            disabled={!!winner}
          >
            {board[i] == 0 ? " " : board[i]}
          </button>
        ))}
      </div>
    </div>
  );
}
