import Board from './board.js';

import { CELLS, INIT_PLAYER, WINNER_MATCH_CELLS } from './settings.js';

function Game() {
  this.init = function () {
    this.currentPlayer = INIT_PLAYER;
    this.grid = Array.from(Array(CELLS), () => new Array(CELLS));

    this.board = new Board();
    this.board.init(this.currentPlayer);

    this.isDiagonalWin();
    // game start
    this.start();
  };

  this.start = function () {
    this.board.board.addEventListener('click', this.main);
    this.board.setTurn(this.currentPlayer);
  };

  this.stop = function () {
    this.board.board.removeEventListener('click', this.main);
    this.board.removeTurn();
  };

  this.main = (event) => {
    const cell = event.target;

    // ignore clicked cells
    for (const type of ['x', 'o']) {
      if (cell.classList.contains(type)) return;
    }

    // set clicked cell class
    this.board.setClassName(cell, this.currentPlayer);

    this.saveCell(cell);

    // check win
    if (this.checkWin()) return;

    // next player
    this.toggleTurns();
  };

  this.toggleTurns = function () {
    const player = this.currentPlayer;
    const current = player === 'x' ? 'o' : 'x';

    this.board.removeTurn();
    this.board.setTurn(current);
    this.currentPlayer = current;
  };

  this.saveCell = function (cell) {
    const index = this.board.cells.indexOf(cell);
    const row = Math.floor(index / CELLS);
    const col = index - row * CELLS;

    const turn = this.currentPlayer;

    this.grid[row][col] = turn;
  };

  this.markWinner = function (winnerIndexes) {
    const cell = this.board.cells[winnerIndexes[0]];
    const name = this.board.getTurn(cell);

    winnerIndexes.forEach((index) => {
      this.board.cells[index].classList.add('win');
    });

    // stop game
    this.stop();
    alert(`player ${name} won`);
  };

  this.isRowWin = function () {
    const rowLength = this.grid.length;
    const colLength = this.grid[0].length;

    for (let row = 0; row < rowLength; row++) {
      let moves = '';

      for (let col = 0; col < colLength; col++) {
        const current = this.grid[row][col];

        if (!current) {
          moves = '';
          continue;
        }

        if (current === moves.slice(-1) || !moves) moves += current;
        else moves = current;

        if (moves.length === WINNER_MATCH_CELLS) {
          let winnerIndexes = [];

          for (let i = 0; i < WINNER_MATCH_CELLS; i++) {
            winnerIndexes.push(row * CELLS + (col - i));
          }

          this.markWinner(winnerIndexes);
          return true;
        }
      }
    }
  };

  this.isColWin = function () {
    const rowLength = this.grid.length;
    const colLength = this.grid[0].length;

    for (let col = 0; col < colLength; col++) {
      let moves = '';

      for (let row = 0; row < rowLength; row++) {
        const current = this.grid[row][col];

        if (!current) {
          moves = '';
          continue;
        }

        if (current === moves.slice(-1) || !moves) moves += current;
        else moves = current;

        if (moves.length === WINNER_MATCH_CELLS) {
          let winnerIndexes = [];

          for (let i = 0; i < WINNER_MATCH_CELLS; i++) {
            winnerIndexes.push((row - i) * CELLS + col);
          }

          this.markWinner(winnerIndexes);
          return true;
        }
      }
    }
  };

  this.isDiagonalWin = function () {
    const rowLength = this.grid.length;
    const colLength = this.grid[0].length;
    const winLength = WINNER_MATCH_CELLS;

    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        this.board.cells[row * CELLS + col].textContent = `${row + col}`;
      }
    }
  };

  this.checkWin = function () {
    if (this.isRowWin()) return true;
    if (this.isColWin()) return true;
    // // diagonal north West
    // this.check(this.cellGroups.northWest.x);
    // this.checkDiagonalIsWin(this.cellGroups.northWest.o);
    // // diagonal north West
    // this.checkDiagonalIsWin(this.cellGroups.northEast.x);
    // this.checkDiagonalIsWin(this.cellGroups.northEast.o);
  };
}

export default Game;
