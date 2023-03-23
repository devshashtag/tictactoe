import Board from "./board.js";

import { WIN_MATCH, BOARD_SIZE, INIT_TURN, CLASS_NAMES } from "./settings.js";

function Game() {
  this.initTurn = INIT_TURN;

  this.init = function () {
    // board blocks turn with index
    this.boardGroups = {
      row: {
        x: {},
        o: {},
      },
      col: {
        x: {},
        o: {},
      },
    };

    // board
    this.board = new Board();
    this.board.init(this.initTurn);

    // game start
    this.start();
  };

  this.start = function () {
    const board = this.board.elements.board;

    board.addEventListener("click", this.main);
  };

  this.stop = function () {
    const board = this.board.elements.board;
    board.removeEventListener("click", this.main);

    this.board.noTurn();
  };

  this.main = (event) => {
    // clicked block
    const block = event.target;

    // if a block has turns class ignore it
    const blockTurns = Object.values(CLASS_NAMES.blockTurns);

    for (const turn of blockTurns) {
      if (block.classList.contains(turn)) return;
    }

    // set current turn to clicked block
    this.board.setBlockTurn(block);

    // save block turn in this.turns
    this.saveBlockTurn(block);

    // next player turn
    this.board.changeTurn();

    // check win
    this.checkWin();
  };

  this.saveBlockTurn = function (block) {
    const index = this.board.blocks.indexOf(block);
    const y = Math.floor(index / BOARD_SIZE);
    const x = index - y * BOARD_SIZE;

    const turn = this.board.getBlockTurn();

    // row
    this.boardGroups.row[turn][y] ??= [];
    this.boardGroups.row[turn][y].push(x);

    // col
    this.boardGroups.col[turn][x] ??= [];
    this.boardGroups.col[turn][x].push(y);
  };

  this.getGroups = function () {
    const groups = {
      row: {},
      col: {},
    };

    for (const key in this.turns) {
      const [y, x] = key.split(",");
      const turn = this.turns[key];

      // row
      groups.row[turn] = groups.row[turn] ?? {};
      groups.row[turn][y] = groups.row[turn][y] ?? [];
      groups.row[turn][y].push(x);

      // col
      groups.col[turn] = groups.col[turn] ?? {};
      groups.col[turn][x] = groups.col[turn][x] ?? [];
      groups.col[turn][x].push(y);
    }

    return groups;
  };

  this.checkTurnsWin = function (turnValues) {
    // check win for turn
    for (const [index, values] of Object.entries(turnValues)) {
      // sort current row values
      values.sort((a, b) => a - b);

      // skip current row if its length less than win_match
      if (values.length < WIN_MATCH) continue;

      let prev = values[0];
      let isWin = false;
      let positions = [];

      for (const curr of values) {
        if (prev + 1 == curr) positions.push(curr);
        else if (!isWin) positions = [curr];
        else break;

        if (positions.length >= WIN_MATCH) isWin = true;

        prev = curr;
      }

      if (isWin) return [+index, positions];
    }
  };

  this.checkRowWin = function () {
    const { x, o } = this.boardGroups.row;

    this.checkisWin(x, "row"); // is row x win
    this.checkisWin(o, "row"); // is row o win
  };

  this.checkColWin = function () {
    const { x, o } = this.boardGroups.col;

    this.checkisWin(x, "col"); // is row x win
    this.checkisWin(o, "col"); // is row o win
  };

  this.checkisWin = function (turnValues, direction) {
    const isWin = this.checkTurnsWin(turnValues);
    if (!isWin) return;

    // block positions
    let [index, positions] = isWin;

    if (direction == "row") {
      positions = positions.map((pos) => pos + index * BOARD_SIZE);
    } else {
      positions = positions.map((pos) => index + pos * BOARD_SIZE);
    }

    // winner player
    const firstBlock = this.board.blocks[positions[0]];
    const turn = this.board.getBlockTurn(firstBlock);

    // add win class to blocks
    for (const x of positions) {
      this.board.blocks[x].classList.add("win");
    }

    // stop game
    this.stop();
    this.board.noTurn();
    alert(`player ${turn} won`);
  };

  this.checkWin = function () {
    this.checkRowWin();
    this.checkColWin();
  };
}

export default Game;
