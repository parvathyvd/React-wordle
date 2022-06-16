import "./App.css";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Keyboard from "./components/Keyboard";
import { BoardContext, useGlobalBoardContext } from "./context/BoardContext";

function App() {
  const { gameOver } = useGlobalBoardContext(BoardContext);

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className="game">
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
    </div>
  );
}

export default App;
