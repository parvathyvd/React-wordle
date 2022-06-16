import React, { useEffect } from "react";
import { BoardContext, useGlobalBoardContext } from "../context/BoardContext";

const Letter = ({ letterPos, attemptVal }) => {
  const {
    board,
    correctWord,
    currAttempt,
    disabledLetters,
    setDisabledLetters,
  } = useGlobalBoardContext(BoardContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters([...disabledLetters, letter, almost, correct]);
    }
  }, [currAttempt.attempt, letter]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
};

export default Letter;
