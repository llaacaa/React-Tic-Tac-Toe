export default function GameBoard({
  resetBoard,
  gameBoard,
  handleGameBoardClick,
  winner,
}) {
  return (
    <>
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => handleGameBoardClick(rowIndex, colIndex)}
                    disabled={playerSymbol !== null || winner}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <div className="reset-div" id="reset">
        <button className="reset-button" onClick={resetBoard}>
          RESET
        </button>
      </div>
    </>
  );
}
