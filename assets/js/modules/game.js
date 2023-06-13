import Board from './board.js';

import { CELLS, CLASS_NAMES, WIN_MATCH_CELLS } from './settings.js';

function Game() {
  // cells-turn group position
  this.cellGroups = {
    row: { x: {}, o: {} },
    col: { x: {}, o: {} },
    northWest: { x: {}, o: {} },
    northEast: { x: {}, o: {} },
  };

  this.init = function () {
    // board init
    this.board = new Board();
    this.board.init();

    // game start
    this.start();
  };

  this.start = function () {
    this.board.elements.board.addEventListener('click', this.main);
    this.board.setTurn(this.board.initTurn);
  };

  this.stop = function () {
    this.board.elements.board.removeEventListener('click', this.main);
    this.board.removeTurn();
  };

  this.main = (event) => {
    // clicked cell
    const cell = event.target;

    // skip if clicked element not a cell
    if (!cell.classList.contains(CLASS_NAMES.cell)) return;

    // if a cell has cell type ignore it
    const cellTypes = Object.values(CLASS_NAMES.cellTypes);

    for (const type of cellTypes) {
      if (cell.classList.contains(type)) return;
    }

    // set current turn to clicked cell
    this.board.setCellTurn(cell);

    // save cell turn in this.cellGroups
    this.saveCell(cell);

    // check win
    if (this.checkWin()) return;

    // board next turn
    this.board.toggleTurn();
  };

  this.saveCell = function (cell) {
    const turn = this.board.getCellTurn();

    const index = this.board.cells.indexOf(cell);
    const row = Math.floor(index / CELLS);
    const col = index - row * CELLS;

    const winMatches = WIN_MATCH_CELLS - 1;

    const diagonalNorthWest = row + col < winMatches || row + col > CELLS * 2 - winMatches - 2;

    const diagonalNorthEast = [...Array(winMatches).keys()].some((offset) => {
      return row == col + CELLS - winMatches + offset || row == col - (CELLS - winMatches + offset);
    });

    // row group
    this.cellGroups.row[turn][row] ??= [];
    this.cellGroups.row[turn][row].push(col);

    // col group
    this.cellGroups.col[turn][col] ??= [];
    this.cellGroups.col[turn][col].push(row);

    // diagonal
    const diagonalRange = CELLS - winMatches;
    const diagonalStart = -(diagonalRange - 1);

    // diagonal north west \ group
    for (let r = diagonalStart, index = 0; r < diagonalRange; r++, index++) {
      if (row == col + r) {
        this.cellGroups.northWest[turn][index] ??= [];
        this.cellGroups.northWest[turn][index].push([row, col]);
        break;
      }
    }

    // diagonal north west / group
    for (let r = diagonalStart, index = 0; r < diagonalRange; r++, index++) {
      if (row + col == CELLS - 1 + r) {
        this.cellGroups.northEast[turn][index] ??= [];
        this.cellGroups.northEast[turn][index].push([row, col]);
        break;
      }
    }
  };

  this.getMatchGroups = function (turnValues) {
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

  this.checkIsWin = function (turnValues, direction) {
    const isWin = this.getMatchGroups(turnValues);

    if (!isWin) return false;

    // cell positions
    let [index, positions] = isWin;

    if (direction == 'row') {
      positions = positions.map((pos) => pos + index * CELLS);
    } else {
      positions = positions.map((pos) => index + pos * CELLS);
    }

    // winner player
    const firstCell = this.board.cells[positions[0]];
    const turn = this.board.getCellTurn(firstCell);

    // add win class to cells
    for (const x of positions) {
      this.board.cells[x].classList.add('win');
    }

    // stop game
    this.stop();
    return true;
  };

  this.getDiagonalMatchGroups = function (turnValues) {
    for (const rows of Object.values(turnValues)) {
      // sort current row values
      rows.sort((a, b) => a[0] - b[0]);

      // skip current row if its length less than win_match_cells
      if (rows.length < WIN_MATCH_CELLS) continue;

      let prev = rows[0][0];
      let isWin = false;
      let positions = [];

      for (const curr of rows) {
        if (prev + 1 == curr[0]) positions.push(curr);
        else if (!isWin) positions = [curr];
        else break;

        if (positions.length >= WIN_MATCH_CELLS) isWin = true;

        prev = curr[0];
      }

      if (isWin) return positions;
    }
  };

  this.checkDiagonalIsWin = function (turnValues) {
    let positions = this.getDiagonalMatchGroups(turnValues);

    if (!positions) return false;

    positions = positions.map((pos) => pos[1] + pos[0] * CELLS);

    // winner player
    const firstCell = this.board.cells[positions[0]];
    const turn = this.board.getCellTurn(firstCell);

    // add win class to cells
    for (const x of positions) {
      this.board.cells[x].classList.add('win');
    }

    // stop game
    this.stop();
    return true;
  };

  this.checkWin = function () {
    // row
    if (this.checkIsWin(this.cellGroups.row.x, 'row')) return true;
    if (this.checkIsWin(this.cellGroups.row.o, 'row')) return true;

    // col
    if (this.checkIsWin(this.cellGroups.col.x, 'col')) return true;
    if (this.checkIsWin(this.cellGroups.col.o, 'col')) return true;

    // diagonal north West
    if (this.checkDiagonalIsWin(this.cellGroups.northWest.x)) return true;
    if (this.checkDiagonalIsWin(this.cellGroups.northWest.o)) return true;

    // diagonal north West
    if (this.checkDiagonalIsWin(this.cellGroups.northEast.x)) return true;
    if (this.checkDiagonalIsWin(this.cellGroups.northEast.o)) return true;
  };
}

export default Game;
