import { useState } from "react";

export default function Player({
  inputValueName,
  playerSymbol,
  handleNameChange,
  isActive,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((curr) => !curr);
    setTimeout(() => {
      const input = document.getElementById("text-input");
      input.focus();
      input.select();
    }, 0);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{inputValueName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            value={inputValueName}
            onChange={handleNameChange}
            id="text-input"
          />
        )}
        <span className="player-symbol">{playerSymbol}</span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
