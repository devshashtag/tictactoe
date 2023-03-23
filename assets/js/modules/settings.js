// responsive cell size

export const CELLS = 10;

const isMobile = window.matchMedia("(max-width: 600px)").matches;
const CELL_SIZE = isMobile ? 8 - CELLS / 2 : 10 - CELLS / 2;

export const STYLES = {
  board: {
    cells: CELLS,
    gap: "0.0rem",
    padding: "0.0rem",
    borderWidth: "0.1rem",
    borderRadius: "0.2rem",
  },

  cell: {
    size: CELL_SIZE + "rem",
    borderRadius: "0.2rem",
  },
};

// class names
export const CLASS_NAMES = {
  // container
  container: "container",

  // board
  board: "board",
  boardTurns: {
    x: "x-turn",
    o: "o-turn",
  },

  // cell
  cell: "cell",
  cellTypes: {
    x: "x",
    o: "o",
  },
};

// options
export const WIN_MATCH_CELLS = 5;
export const INIT_TURN = CLASS_NAMES.boardTurns.x;
