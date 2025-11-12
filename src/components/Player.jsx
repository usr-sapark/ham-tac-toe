import React, { useState } from "react";

const Player = ({ name, symbol, isActive, onChangeName }) => {
  // edit여부 상태 셍성
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  // 함수
  const handleButton = () => {
    // !isEditing은 비동기 처리 불가 > 이전값 기반하여 업데이트 하는 방식으로 변경
    // isEdited => !isEdited
    setIsEditing((prev) => !prev);
    onChangeName(symbol, editedName);
  };

  // input field
  const handleChange = (event) => {
    setEditedName(event.target.value);
  };

  // 동적 값 할당
  const playerName = isEditing ? (
    <input type="text" required value={editedName} onChange={handleChange} />
  ) : (
    editedName
  );
  const btnCaption = isEditing ? "Save" : "Edit";

  return (
    <li className={`${isActive ? "active" : ""}`}>
      <span className="player">
        <span className="player-name">{playerName}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleButton}>{btnCaption}</button>
    </li>
  );
};

export default Player;
