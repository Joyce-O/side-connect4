const selecetdCell = (grid, cellId, col) => {
  let midPart = 3 / 2;
  let row = grid[col];
  let origCellId = cellId.slice(1);
  cellId += '2'//append placeholder value

  //Check if left side is fillled
  if (origCellId !== -1 && (origCellId / 2) < midPart) {
    return reduceFn(row, origCellId);
  }

  //Check if right side is filled
  if (origCellId !== -1 && (origCellId / 2) > midPart) {
    return reduceRightFn(row, origCellId)
  }

  // Else add to center
  if (origCellId !== -1 && (origCellId / 2) == midPart) {
    //TODO: decide how to handle center cell
    return row[origCellId];
  }
};

export const handleSideStack = (grid, cellId) => {
  let col = cellId.charAt(0);
  let newId = selecetdCell(grid, cellId, col);

  newId = newId.slice(0, -1);
  return newId;

}

const reduceRightFn = (row, origCellId) => {
  let index = row.length;
  let newId;
  while (--index > -1) {
    let value = row[index].charAt(row[index].length - 1);
    if (value == 2 && index > origCellId || index == origCellId && (origCellId !== 3)) {
      newId = row[index];
      break;
    };
  }
  return newId;
}

const reduceFn = (row, origCellId) => {
  let newId;
  for (let i = 0; i < row.length; ++i) {
    let value = row[i].charAt(row[i].length - 1);//2 is a placeholder for empty currently

    if (value == 2 && i < origCellId || i == origCellId && (origCellId !== 3)) {
      newId = row[i];
      return newId;
    };
    if (value == 2 && i > origCellId) {
      break;
    }
  }

};
