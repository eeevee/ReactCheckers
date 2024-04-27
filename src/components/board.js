import React, { useEffect, useState } from "react";
import Square from "./square";

function Board() {
	const [board, setBoard] = useState(setInitialBoard());
	const [player, setPlayer] = useState(1);
	const [selectedPiece, setSelectedPiece] = useState(null);

	useEffect(() => {
		console.log("selectedPiece", selectedPiece);
	}, [selectedPiece]);

	function setInitialBoard() {
		const newBoard = Array(8).fill().map(() => Array(8).fill(null));

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 === 0) {
					newBoard[i][j] = { color: "black" };
				}
			}
		}

		for (let i = 5; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 === 0) {
					newBoard[i][j] = { color: "red" };
				}
			}
		}

		return newBoard;
	}

	function isValidMove(i, j) {
		console.log(board[i][j])
		if (board[i][j]) return false; // só retorna se for da mesma cor, senão vai comer a pedra

		if (Math.abs(selectedPiece.i - i) !== 1 || Math.abs(selectedPiece.j - j) !== 1){
			return false;
		}

		if (selectedPiece.color === 'red' && selectedPiece.i < i){
			return false;
		}
		if (selectedPiece.color === 'black' && selectedPiece.i > i){
			return false;
		}

		return true;
	}

	function movePiece(i, j) {
		const newBoard = [...board];
		newBoard[i][j] = newBoard[selectedPiece.i][selectedPiece.j];
		newBoard[selectedPiece.i][selectedPiece.j] = null;
		setBoard(newBoard);
	}

	function handleClick(i, j) {
		if (board[i][j]){
			setSelectedPiece({ i, j, color: board[i][j].color});
		} else if (selectedPiece){
			if (isValidMove(i, j)) {
				movePiece(i, j);
				setSelectedPiece(null);
			}
		}

		setPlayer(3 - player);
	}

	return (
		<div className="board">
			{board.map((row, i) => (
				<div key={i} className="row">
					{row.map((piece, j) => (
						<Square key={j} piece={piece} onClick={() => handleClick(i, j)} isSelected={selectedPiece && selectedPiece.i === i && selectedPiece.j === j} />
					))}
				</div>
			))}
		</div>
	);
}

export default Board;
