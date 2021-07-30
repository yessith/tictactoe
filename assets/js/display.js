'use strict';

class Display {
	newScoreX = 0;
	newScoreO = 0;
	constructor() {}

	// Método para obtener ID y Selectores de HTML
	getElement = (selector) => document.querySelector(selector);
	getAllElements = (selector) => document.querySelectorAll(selector);

	// Método para crear un elemento de HTML y darle un nombre de clase
	createElement = (tag, className, dataset) => {
		const element = document.createElement(tag);
		if (className) element.classList.add(className);
		if (dataset) element.dataset[dataset[0]] = dataset[1];
		return element;
	};

	// DOM Elements
	DOM = {
		message: this.getElement('#newMessage'),
		resetBtn: this.getElement('.reset__btn'),

		nameA: this.getElement('#nameA'),
		nameB: this.getElement('#nameB'),

		tokenX: this.getElement('#token_x'),
		tokenO: this.getElement('#token_o'),

		scoreX: this.getElement('#score_x'),
		scoreO: this.getElement('#score_o'),
	};

	cleaning = () => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve((this.DOM.message.textContent = ''));
			}, 1100);
		});
	};

	async clearMessage() {
		const clear = await this.cleaning();
		return clear;
	}

	clearGameBoard = () => {
		const cells = this.getAllElements('.gameBoard__box__cell');
		cells.forEach((cell) => (cell.textContent = ''));
	};

	showScore = (winner) => {
		winner === 'x'
			? ((this.newScoreX += 1), (this.DOM.scoreX.textContent = this.newScoreX))
			: ((this.newScoreO += 1), (this.DOM.scoreO.textContent = this.newScoreO));
	};

	//Modelo base del tablero de juego
	createBoard = () => {
		return [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];
	};
}

export { Display };
