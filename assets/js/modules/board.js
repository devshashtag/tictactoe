import { BOARD_SIZE, STYLES, CLASS_NAMES } from "./settings.js";

function Board() {
  this.boardSize = BOARD_SIZE;

  this.blocks = [];

  this.elements = {
    root: document.querySelector("body > main"),
  };

  this.init = function (initTurn) {
    // container
    this.elements.container = this.addContainer();

    // board
    this.elements.board = this.addBoard(initTurn);

    // add board blocks
    this.addBlocks();
  };

  this.addContainer = function (parent = this.elements.root) {
    const container = this.addElement(CLASS_NAMES.container, parent);

    container.textContent = "tic tac toe";

    return container;
  };

  this.addBoard = function (initTurn) {
    const board = this.addElement(CLASS_NAMES.board, this.elements.container);

    // board grid-gap, padding, grid-template-columns
    board.style.gap = STYLES.board.gap + "rem";
    board.style.borderWidth = STYLES.board.width + "rem";
    board.style.borderRadius = STYLES.board.radius + "rem";
    board.style.padding = STYLES.board.padding + "rem";
    board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;

    // set board init turn
    this.setClassName(board, initTurn);

    return board;
  };

  this.addBlocks = function () {
    for (let i = 0; i < this.boardSize ** 2; i++) {
      this.addBlock();
    }
  };

  this.addBlock = function () {
    const block = this.addElement(CLASS_NAMES.block);

    // block size
    const size = STYLES.block.size + "rem";
    block.style.width = size;
    block.style.height = size;

    // border radius
    block.style.borderRadius = STYLES.block.radius + "rem";

    // add block to blocks
    this.blocks.push(block);

    return block;
  };

  this.addElement = function (className, parent = this.elements.board) {
    const element = document.createElement("div");

    this.setClassName(element, className);

    parent.appendChild(element);

    return element;
  };

  this.setClassName = function (element, className) {
    if (typeof className == "string") {
      element.classList.add(className);
    } else {
      element.classList.add(...className);
    }
  };

  this.removeClassName = function (element, className) {
    element.classList.remove(className);
  };

  this.getBlockTurn = function (block = this.elements.board) {
    const boardTurn = block.className.split(" ").pop();
    const blockTurn = boardTurn.split("-")[0];

    return blockTurn;
  };

  this.setBlockTurn = function (block) {
    // get current block turn
    const blockTurn = this.getBlockTurn();

    // set turn to block
    this.setClassName(block, blockTurn);
  };

  this.noTurn = function () {
    const board = this.elements.board;

    board.classList.remove(CLASS_NAMES.boardTurns.o);
    board.classList.remove(CLASS_NAMES.boardTurns.x);
  };

  this.changeTurn = function () {
    const board = this.elements.board;

    board.classList.toggle(CLASS_NAMES.boardTurns.o);
    board.classList.toggle(CLASS_NAMES.boardTurns.x);
  };

  this.blockPosition = function (block) {
    return {
      x: parseInt(block.style.left) / this.block.size,
      y: parseInt(block.style.top) / this.block.size,
    };
  };
}

export default Board;
