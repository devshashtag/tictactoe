import { STYLES, CELLS } from './settings.js';

function Board() {
  this.cells = [];

  this.init = function (initPlayer, title = 'tic tac toe') {
    const container = document.querySelector('main > .container');
    container.textContent = title;

    // board
    this.board = this.addElement(['board', initPlayer + '-turn'], container);
    Object.assign(this.board.style, STYLES.board);

    // add board cells
    this.addCells();
  };

  this.addCell = function () {
    const cell = this.addElement('cell');

    // styles
    Object.assign(cell.style, {
      width: STYLES.cell.size,
      height: STYLES.cell.size,
      borderRadius: STYLES.cell.borderRadius,
    });

    // save cell
    this.cells.push(cell);

    return cell;
  };

  this.addCells = function () {
    for (let i = 0; i < CELLS ** 2; i++) this.addCell();
  };

  this.addElement = function (className, parent = this.board) {
    const element = document.createElement('div');

    // class name
    this.setClassName(element, className);

    // append element to parent
    parent.appendChild(element);

    return element;
  };

  this.setClassName = function (element, className) {
    if (typeof className == 'string') element.classList.add(className);
    else element.classList.add(...className);
  };

  // get current turn
  this.getTurn = function (element = this.board) {
    return element.className.split(' ').at(-1);
  };

  this.setTurn = function (player) {
    this.board.classList.add(player + '-turn');
  };

  // remove current board turn
  this.removeTurn = function () {
    const turn = this.getTurn();

    if (turn === 'board') return;

    this.board.classList.remove(turn);
  };
}

export default Board;
