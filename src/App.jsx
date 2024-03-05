import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function CheckGameWinner(gameBoardCopy, symbol) {
  return (
    (gameBoardCopy[0][0] === gameBoardCopy[0][1] &&
      gameBoardCopy[0][0] === gameBoardCopy[0][2] &&
      gameBoardCopy[0][0] === symbol) ||
    (gameBoardCopy[1][0] === gameBoardCopy[1][1] &&
      gameBoardCopy[1][0] === gameBoardCopy[1][2] &&
      gameBoardCopy[1][0] === symbol) ||
    (gameBoardCopy[2][0] === gameBoardCopy[2][1] &&
      gameBoardCopy[2][0] === gameBoardCopy[2][2] &&
      gameBoardCopy[2][0] === symbol) ||
    (gameBoardCopy[0][0] === gameBoardCopy[1][0] &&
      gameBoardCopy[0][0] === gameBoardCopy[2][0] &&
      gameBoardCopy[0][0] === symbol) ||
    (gameBoardCopy[0][1] === gameBoardCopy[1][1] &&
      gameBoardCopy[0][1] === gameBoardCopy[2][1] &&
      gameBoardCopy[0][1] === symbol) ||
    (gameBoardCopy[0][2] === gameBoardCopy[1][2] &&
      gameBoardCopy[0][2] === gameBoardCopy[2][2] &&
      gameBoardCopy[0][2] === symbol) ||
    (gameBoardCopy[0][0] === gameBoardCopy[1][1] &&
      gameBoardCopy[0][0] === gameBoardCopy[2][2] &&
      gameBoardCopy[0][0] === symbol) ||
    (gameBoardCopy[0][2] === gameBoardCopy[1][1] &&
      gameBoardCopy[0][2] === gameBoardCopy[2][0] &&
      gameBoardCopy[0][2] === symbol)
  );
}

function App() {
  const [symbol, setSymbol] = useState(true);
  const [inputValueName1, setInputValueName1] = useState("Player 1");
  const [inputValueName2, setInputValueName2] = useState("Player 2");
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner, setWinner] = useState(false);
  const [playerTurns, setPlayerTurns] = useState([]);

  const handleSymbolChange = () => {
    setSymbol((s) => !s);
  };

  const resetGame = () => {
    setSymbol(true);
  };

  const handleNameChange1 = (evt) => setInputValueName1(evt.target.value);
  const handleNameChange2 = (evt) => setInputValueName2(evt.target.value);

  const resetBoard = () => {
    setGameBoard(initialGameBoard);
    resetGame();
    setPlayerTurns([]);
    setWinner(false);
  };

  const handleGameBoardClick = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      if (updatedGameBoard[rowIndex][colIndex] === null) {
        updatedGameBoard[rowIndex][colIndex] = symbol ? "X" : "O";
        handleSymbolChange();
        setPlayerTurns((currTurns) => {
          return [
            ...currTurns,
            { row: rowIndex, col: colIndex, player: symbol },
          ];
        });
      }
      return updatedGameBoard;
    });
    setGameBoard((prevGameBoard) => {
      const gameBoardCopy = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      if (CheckGameWinner(gameBoardCopy, "X")) {
        setWinner(inputValueName1);
      }
      if (CheckGameWinner(gameBoardCopy, "O")) {
        setWinner(inputValueName2);
      }
      setPlayerTurns((currPlayerTurns) => {
        if (currPlayerTurns.length === 9) {
          setWinner("DRAW");
        }
        return currPlayerTurns;
      });
      return gameBoardCopy;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            inputValueName={inputValueName1}
            playerSymbol="X"
            handleNameChange={handleNameChange1}
            isActive={symbol}
          />
          <Player
            inputValueName={inputValueName2}
            playerSymbol="O"
            handleNameChange={handleNameChange2}
            isActive={!symbol}
          />
        </ol>
        {winner && <GameOver winner={winner} resetBoard={resetBoard} />}
        <GameBoard
          symbol={symbol}
          handleSymbolChange={handleSymbolChange}
          resetBoard={resetBoard}
          gameBoard={gameBoard}
          handleGameBoardClick={handleGameBoardClick}
          winner={winner}
        />
      </div>
      <Log
        turns={playerTurns}
        inputValueName1={inputValueName1}
        inputValueName2={inputValueName2}
      />
    </main>
  );
}

export default App;
