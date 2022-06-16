import React from "react";
import { BoardContext, useGlobalBoardContext } from "../context/BoardContext";

const Key = ({ keyVal, bigKey, disabled }) => {
  const { onEnter, onDelete, onSelect } = useGlobalBoardContext(BoardContext);
  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelect(keyVal);
    }
  };
  return (
    <div
      className="key"
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
};

export default Key;
