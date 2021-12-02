import { gamePlaying } from "./gameEvents";
const systemPlayer = async (obj) => {
  const { stage, gameId, turn, grid } = obj;
  const emptyCells = grid.flat().filter((cell) => cell.substr(cell.length - 1) == 2);
  const cellId = emptyCells[Math.floor(Math.random()*emptyCells.length)];

  const cellValue = 0;

  const game = await gamePlaying(gameId,stage, cellId, cellValue);
  return game;
};

export default systemPlayer;
