'use strict';
import { Display } from '../../modules/display.js';
class Tic_Tac_Toe extends Display {
	constructor() {
		super();
	}

	DATA = {
		board: [],
		playerOne: '',
		playerTwo: '',
		currentPlayer: '',
		turn: 0,
		total: 9,
	};

	// Método para conocer el ganador de la partida
	gameWon = (indexRow, indexCol) => {
		if (
			(this.DATA.board[indexRow][0] === this.DATA.currentPlayer &&
				this.DATA.board[indexRow][1] === this.DATA.currentPlayer &&
				this.DATA.board[indexRow][2] === this.DATA.currentPlayer) ||
			(this.DATA.board[0][indexCol] === this.DATA.currentPlayer &&
				this.DATA.board[1][indexCol] === this.DATA.currentPlayer &&
				this.DATA.board[2][indexCol] === this.DATA.currentPlayer) ||
			(this.DATA.board[0][0] === this.DATA.currentPlayer &&
				this.DATA.board[1][1] === this.DATA.currentPlayer &&
				this.DATA.board[2][2] === this.DATA.currentPlayer) ||
			(this.DATA.board[2][0] === this.DATA.currentPlayer &&
				this.DATA.board[1][1] === this.DATA.currentPlayer &&
				this.DATA.board[0][2] === this.DATA.currentPlayer)
		)
			return true;
		return false;
	};

	winMessage = (winner) => {
		const newMessage = winner === this.DATA.playerOne ? 'Player One Es El Ganador' : 'Player Two Es El Ganador';
		this.DOM.message.textContent = newMessage;
	};

	showData = (currentPlayer) => {
		this.showScore(currentPlayer);
		this.winMessage(currentPlayer);
		this.clearMessage();
		this.DATA.board = this.createBoard();
		this.clearGameBoard();
	};
	// Método para cambiar el turno del jugador
	switchPlayer = () =>
		(this.DATA.currentPlayer = this.DATA.currentPlayer === this.DATA.playerOne ? this.DATA.playerTwo : this.DATA.playerOne);

	// Método para dibujar la ficha de cada jugador en el tablero
	updateBoard = (indexRow, indexCol, currentPlayer) => {
		const playerToken = this.createElement('span', currentPlayer, undefined);
		playerToken.textContent = currentPlayer;

		const boardRow = this.getElement('[data-row="' + indexRow + '"]');
		const cell = boardRow.querySelector('[data-col="' + indexCol + '"]');
		cell.append(playerToken);
	};

	// Método que recibe los indices de la row & col donde se esta haciendo click
	// Actualiza el tablero dibujando las fichas de los jugadores y se determina
	// Si hay un ganador o hay un empate.
	readyPlayer = (indexRow, indexCol) => {
		this.DATA.board[indexRow][indexCol] = this.DATA.currentPlayer;
		this.updateBoard(indexRow, indexCol, this.DATA.currentPlayer);

		const win = this.gameWon(indexRow, indexCol);
		if (!win) {
			this.DATA.turn++;
			if (this.DATA.turn === this.DATA.total) {
				this.DATA.board = this.createBoard();
				this.clearGameBoard();
				this.DATA.currentPlayer = this.DATA.playerOne;
				this.DATA.turn = 0;
				this.DOM.message.textContent = 'Hubo un empate';
				this.clearMessage();
			} else {
				this.switchPlayer();
			}
		} else {
			this.showData(this.DATA.currentPlayer);
			this.DATA.currentPlayer = this.DATA.playerOne;
			this.DATA.turn = 0;
		}
	};

	// Método para saber en que celda del tablero se esta haciendo click
	clickCell = (...columns) => {
		const _this = this;

		columns.forEach(function (cell) {
			cell.addEventListener('click', (event) => {
				const clicked = event.target;
				const isColumn = clicked.className === 'gameBoard__box__cell';
				if (isColumn) {
					const cell = clicked;
					const indexRow = cell.parentElement.dataset.row;
					const indexCol = cell.dataset.col;
					_this.readyPlayer(indexRow, indexCol);
				}
			});
		});
	};

	// Método para dibujar el tablero de juego
	paintGameBoard = () => {
		const _this = this;
		this.DATA.board = this.createBoard();

		const gameBoard = this.getElement('.gameBoard__box');
		gameBoard.textContent = '';

		this.DATA.board.forEach(function (row, i) {
			const boarRow = _this.createElement('div', 'gameBoard__box__row', ['row', i]);
			gameBoard.append(boarRow);
			row.forEach(function (col, j) {
				const boardCol = _this.createElement('div', 'gameBoard__box__cell', ['col', j]);
				boarRow.append(boardCol);
				_this.clickCell(boardCol);
			});
		});
	};

	// Método que determina que ficha corresponde a que jugador
	selectPlayer = (token) => {
		if (token === 'x') {
			this.DATA.playerOne = 'x';
			this.DATA.playerTwo = 'o';
			this.DOM.nameA.textContent = 'One';
			this.DOM.nameB.textContent = 'Two';
		} else {
			this.DATA.playerOne = 'o';
			this.DATA.playerTwo = 'x';
			this.DOM.nameB.textContent = 'One';
			this.DOM.nameA.textContent = 'Two';
		}

		this.DATA.currentPlayer = this.DATA.playerOne;
		this.paintGameBoard();
	};

	reset = () => {
		const gameBoard = this.getElement('.gameBoard__box');
		gameBoard.textContent = '';
		this.DATA.playerOne = '';
		this.DATA.playerTwo = '';
		this.DATA.currentPlayer = '';
		this.DOM.nameB.textContent = '?';
		this.DOM.nameA.textContent = '?';
		this.DOM.scoreX.textContent = 0;
		this.DOM.scoreO.textContent = 0;
		this.newScoreO = 0;
		this.newScoreX = 0;
	};

	playGame = () => {
		this.DOM.tokenX.addEventListener('click', () => this.selectPlayer('x'));
		this.DOM.tokenO.addEventListener('click', () => this.selectPlayer('o'));
		this.DOM.resetBtn.addEventListener('click', this.reset);
	};
}

const starGame = new Tic_Tac_Toe();
starGame.playGame();
