import Board from "./board.js";

import { CELLS, CLASS_NAMES, WIN_MATCH_CELLS } from "./settings.js";

function Game() {
  // cells-turn group position
  this.cellGroups = {
    row: { x: {}, o: {} },
    col: { x: {}, o: {} },
  };

  this.init = function () {
    // board init
    this.board = new Board();
    this.board.init();

    // game start
    this.start();
  };

  this.start = function () {
    this.board.elements.board.addEventListener("click", this.main);
    this.board.setTurn(this.board.initTurn);
  };

  this.stop = function () {
    this.board.elements.board.removeEventListener("click", this.main);
    this.board.removeTurn();
  };

  this.main = (event) => {
    // clicked cell
    const cell = event.target;

    // if a cell has cell type ignore it
    const cellTypes = Object.values(CLASS_NAMES.cellTypes);

    for (const type of cellTypes) {
      if (cell.classList.contains(type)) return;
    }

    // set current turn to clicked cell
    this.board.setCellTurn(cell);

    // save cell turn in this.cellGroups
    this.saveCell(cell);

    // board next turn
    this.board.toggleTurns();

    // check win
    this.checkWin();
  };

  this.saveCell = function (cell) {
    const turn = this.board.getCellTurn();

    const index = this.board.cells.indexOf(cell);
    const row = Math.floor(index / CELLS);
    const col = index - row * CELLS;

    // row group
    this.cellGroups.row[turn][row] ??= [];
    this.cellGroups.row[turn][row].push(col);

    // col group
    this.cellGroups.col[turn][col] ??= [];
    this.cellGroups.col[turn][col].push(row);
  };

  this.checkTurnsWin = function (turnValues) {
    // check win for turn
    for (const [index, values] of Object.entries(turnValues)) {
      // sort current row values
      values.sort((a, b) => a - b);

      // skip current row if its length less than win_match_cells
      if (values.length < WIN_MATCH_CELLS) continue;

      let prev = values[0];
      let isWin = false;
      let positions = [];

      for (const curr of values) {
        if (prev + 1 == curr) positions.push(curr);
        else if (!isWin) positions = [curr];
        else break;

        if (positions.length >= WIN_MATCH_CELLS) isWin = true;

        prev = curr;
      }

      if (isWin) return [+index, positions];
    }
  };

  this.checkisWin = function (turnValues, direction) {
    const isWin = this.checkTurnsWin(turnValues);

    if (!isWin) return;

    // cell positions
    let [index, positions] = isWin;

    if (direction == "row") {
      positions = positions.map((pos) => pos + index * CELLS);
    } else {
      positions = positions.map((pos) => index + pos * CELLS);
    }

    // winner player
    const firstCell = this.board.cells[positions[0]];
    const turn = this.board.getCellTurn(firstCell);

    // add win class to cells
    for (const x of positions) {
      this.board.cells[x].classList.add("win");
    }

    // stop game
    this.stop();
    alert(`player ${turn} won`);
  };

  this.checkRowWin = function () {
    const { x, o } = this.cellGroups.row;

    this.checkisWin(x, "row"); // is row x win
    this.checkisWin(o, "row"); // is row o win
  };

  this.checkColWin = function () {
    const { x, o } = this.cellGroups.col;

    this.checkisWin(x, "col"); // is row x win
    this.checkisWin(o, "col"); // is row o win
  };

  this.checkWin = function () {
    this.checkRowWin();
    this.checkColWin();
  };
}

export default Game;
