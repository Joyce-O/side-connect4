export const maxRepeatingMove = (row) => {
  let player = row[0];
  let count = 0;
  let selectedCells = [];

  for (let i = 0; i < row.length; i++) {
    let value = row[i].slice(2);
    if (value == player && value != 2) {
      //2 is a placeholder for empty cells
      count += 1;
      player = value;
      selectedCells.push(row[i]);
    }
    if (value != player && value != 2) {
      count = 1;
      player = value;
      selectedCells.push(row[i]);
    }
    if (value != player && value == 2) {
      count = 0;
      player = value;
    }
    if (count == 4) {
      break;
    }
  }

  return { count, player, selectedCells };
};

export const gameDraw = (grid) => {
  const arr = grid.flat().map((item) => {
    item = item.slice(2);
    return item;
  });

  return arr.indexOf("2");
};
