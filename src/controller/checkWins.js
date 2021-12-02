import { maxRepeatingMove, gameDraw } from "./utility";

export const handleArrDimension = (grid) => {
  const col_len = grid[0].length;
  const row_len = grid.length;
  const cols = [[], [], [], [], [], [], []];
  const rows = [[], [], [], [], [], [], []];
  const forward_diag = [[], [], [], [], [], [], [], [], [], [], [], [], []];
  const backward_diag = [[], [], [], [], [], [], [], [], [], [], [], []];
  const min_backdiag = -row_len + 1;

  for (let i = 0; i < col_len; i++) {
    for (let j = 0; j < row_len; j++) {
      const value = grid[j][i];
      cols[i].push(value);
      rows[j].push(value);
      forward_diag[i + j].push(value);
      if (backward_diag[i - j - min_backdiag]) {
        backward_diag[i - j - min_backdiag].push(value);
      }
    }
  }

  const arr = [...rows, ...cols, ...backward_diag, ...forward_diag];
  return arr;
};

export const checkWins = (grid) => {
  const totalDimension = handleArrDimension(grid);
  let result;
  for (let i = 0; i < totalDimension.length; i++) {
    let max = maxRepeatingMove(totalDimension[i]);
    if (max.count == 4) {
      result = max;
      break;
    }

    result = max;
  }

  if (result.count != 4) {
    //check if it's a draw
    let draw = gameDraw(grid);
    if (draw == -1) {
      result.count = draw;
    }
  }
  return result;
};
