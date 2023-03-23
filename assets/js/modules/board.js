import { STYLES, CLASS_NAMES, INIT_TURN } from "./settings.js";

function Board() {
  this.styles = STYLES;
  this.classes = CLASS_NAMES;
  this.initTurn = INIT_TURN;
  this.elements = [];
  this.cells = [];

  this.init = function () {
    // root
    this.elements.root = document.querySelector("body > main");

    // container
    this.elements.container = this.addContainer();

    // board
    this.elements.board = this.addBoard();

    // add board cells
    this.addCells();
  };

  this.addContainer = function (parent = this.elements.root) {
    const container = this.addElement(this.classes.container, parent);

    container.textContent = "tic tac toe";

    return container;
  };

  this.addBoard = function (parent = this.elements.container) {
    const styles = this.styles.board;
    const board = this.addElement(this.classes.board, parent);

    // board styles
    Object.assign(board.style, {
      gap: styles.gap,
      padding: styles.padding,
      borderWidth: styles.borderWidth,
      borderRadius: styles.borderRadius,
      gridTemplateColumns: `repeat(${styles.cells}, 1fr)`,
    });

    return board;
  };

  this.addCell = function () {
    const styles = this.styles.cell;
    const cell = this.addElement(this.classes.cell);

    // styles
    Object.assign(cell.style, {
      width: styles.size,
      height: styles.size,
      borderRadius: styles.borderRadius,
    });

    // add cell to cells list
    this.cells.push(cell);

    return cell;
  };

  this.addCells = function () {
    for (let i = 1; i <= this.styles.board.cells ** 2; i++) {
      this.addCell();
    }
  };

  this.addElement = function (className, parent = this.elements.board) {
    const element = document.createElement("div");

    // class name
    this.setClassName(element, className);

    // append element to parent
    parent.appendChild(element);

    return element;
  };

  this.setClassName = function (element, className) {
    if (typeof className == "string") element.classList.add(className);
    else element.classList.add(...className);
  };

  // get current turn
  this.getTurn = function (element = this.elements.board) {
    return element.className.split(" ").at(-1);
  };

  this.setTurn = function (turn = this.initTurn) {
    this.elements.board.classList.add(turn);
  };

  // remove current board turn
  this.removeTurn = function () {
    const turn = this.getTurn();

    this.elements.board.classList.remove(turn);
  };

  // toggle turns
  this.toggleTurns = function () {
    const boardTurns = Object.values(this.classes.boardTurns);

    boardTurns.forEach((turn) => {
      this.elements.board.classList.toggle(turn);
    });
  };

  // get current cell turn
  this.getCellTurn = function (element = this.elements.board) {
    const boardTurn = element.className.split(" ").at(-1);
    const cellTurn = boardTurn.split("-")[0];

    return cellTurn;
  };

  this.setCellTurn = function (cell) {
    const turn = this.getCellTurn();

    // set turn to cell
    this.setClassName(cell, turn);
  };
}

export default Board;
