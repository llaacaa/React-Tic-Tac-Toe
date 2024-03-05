export default function Log({ turns, inputValueName1, inputValueName2 }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.row}${turn.col}`}>
          {turn.player ? inputValueName1 : inputValueName2} selected ({turn.row}
          , {turn.col})
        </li>
      ))}
    </ol>
  );
}
