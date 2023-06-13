// responsive cell size

const isMobile = window.matchMedia('(max-width: 600px)').matches;

// options
export const CELLS = 10;
export const WINNER_MATCH_CELLS = 5;
export const INIT_PLAYER = 'x';
const CELL_SIZE = isMobile ? 8 - CELLS / 2 : 10 - CELLS / 2;

export const STYLES = {
  board: {
    gap: '0',
    padding: '0',
    borderWidth: '0.1rem',
    borderRadius: '0.2rem',
    gridTemplateColumns: `repeat(${CELLS}, 1fr)`,
  },

  cell: {
    size: CELL_SIZE + 'rem',
    borderRadius: '0.2rem',
  },
};

// class names
export const CLASS_NAMES = {
  // container
  container: 'container',

  // board
  board: 'board',

  // cell
  cell: 'cell',
};
