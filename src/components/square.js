import React from "react";

function Square({ piece, onClick, isSelected }) {
  return (
	<div className="cell" onClick={onClick}>
		{piece && <div className={`piece ${piece.color} ${isSelected ? 'selected' : ''}`} />}
	</div>
  );
}

export default Square;
