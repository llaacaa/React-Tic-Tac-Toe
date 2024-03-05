export default function GameOver({ winner, resetBoard }) {
  const displayWinner = winner === "DRAW" ? "DRAW" : `${winner} won!`;
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{displayWinner}</p>
      <p>
        <button onClick={resetBoard}>Rematch!</button>
      </p>
    </div>
  );
}
