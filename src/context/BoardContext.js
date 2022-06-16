import { createContext, useContext, useState, useEffect } from "react";
import { boardDefault } from "../components/Words";
import { generateWordSet } from "../components/Words";

export const BoardContext = createContext({});

export const BoardContextProvider = ({ children }) => {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  const [wordSet, setWordSet] = useState(new Set());

  useEffect(() => {
    generateWordSet().then((words) => {
      console.log(words);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
    console.log(correctWord);
  }, []);

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({
        ...currAttempt,
        attempt: currAttempt.attempt + 1,
        letterPos: 0,
      });
    } else {
      alert("word not found");
    }
    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };
  const onDelete = () => {
    const currBoard = [...board];
    if (currAttempt.letterPos === 0) return;
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos - 1,
    });
    currBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(currBoard);
  };

  const onSelect = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const currBoard = [...board];
    currBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(currBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letterPos: currAttempt.letterPos + 1,
    });
  };
  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onDelete,
        onEnter,
        onSelect,
        correctWord,
        wordSet,
        setWordSet,
        disabledLetters,
        setDisabledLetters,
        setGameOver,
        gameOver,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useGlobalBoardContext = () => {
  return useContext(BoardContext);
};
