const isMobile = window.matchMedia("(max-width: 600px)").matches;

// board [rem size]
export const WIN_MATCH = 3;

export const BOARD_SIZE = 5;

export const STYLES = {
  board: {
    width: 0.1,
    padding: 0.0,
    radius: 0.2,
    gap: 0.0,
  },

  block: {
    size: isMobile ? 8 - BOARD_SIZE / 2 : 10 - BOARD_SIZE / 2,
    radius: 0.2,
  },
};

export const CLASS_NAMES = {
  container: "container",

  // board
  board: "board",
  boardTurns: {
    x: "x-turn",
    o: "o-turn",
  },

  // block
  block: "block",
  blockTurns: {
    x: "x",
    o: "o",
  },
};

export const INIT_TURN = CLASS_NAMES.boardTurns.x;
