import { pool } from "../db/index";

const generateGrid = (col, row) => {
  let arr = new Array(col).fill(null).map(() => new Array(row).fill(0));
  let grid = [];
  for (let i = 0; i < arr.length; i++) {
    let gridRow = [];
    for (let j = 0; j < arr[i].length; j++) {
      gridRow.push(`${i}${j}`);
    }
    grid.push(gridRow);
  }
  return grid;
};

export const createGame = async (id, stage) => {
  const values = [[id, stage]]
  let sql = `INSERT INTO games(id, stage) VALUES ?`;
  const game = await pool.promise().query(sql, [values]);
  return Array.from(game);
};

export const saveGrid = async (gameId, grid = generateGrid(7, 7)) => {
  let sql = `INSERT INTO gridCells(id, gameId) VALUES ?`;
  const values = grid.flat().map((id) => {
    return [id, gameId];
  });

  const res = await pool.promise().query(sql, [values]);

  return { res, grid };
};

export const createPlayer = async (gameId) => {
  let sql = 'INSERT INTO players(isHost, gameId) VALUES ?';
  const values = [[1, gameId], [0, gameId]];

  const player = await pool.promise().query(sql, [values]);
  return player;
};

export const fetchGame = async (id) => {
  let sql = `SELECT games.stage, games.turn, games.winner, games.teamType, games.id as gameId, gridCells.value, gridCells.id as cellId,
    (SELECT count(*) FROM gridCells WHERE gridCells.gameId=?) gridSize
    FROM games
    INNER JOIN gridCells ON games.id=gridCells.gameId
    WHERE games.id=?
   `;
    
  const game = await pool.promise().query(sql, [id, id]);
  const [result] = game;
  const formatted = Array.from(result);
  const { stage, gameId, gridSize, turn, winner, teamType } = formatted[0];
  let grid = formatted.map((item) => {
    let value = item.value ? item.value : 2;
    return item.cellId += value;
  });


  const newArr = [];
  while (grid.length) newArr.push(grid.splice(0, 7));
  return { stage, turn, winner, gameId, gridSize, grid: newArr, teamType };


}

export const updateGame = async (values, id) => {

  let sql = `UPDATE games SET ? WHERE id = ?`;
  const res = await pool.promise().query(sql, [values, id]);
  return res;
}

export const updateGridCell = async (value, gameId, cellId) => {
  let sql = `UPDATE gridCells SET ? WHERE id = ? AND gameId = ?`;
  const res = await pool.promise().query(sql, [value, cellId, gameId]);
  return res;
}
