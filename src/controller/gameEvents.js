import {
  updateGridCell,
  updateGame,
  fetchGame,
  createPlayer,
  saveGrid,
  createGame,
} from "../db/queries";
import { handleSideStack } from "./handleSideStack";
import { checkWins } from "./checkWins";

export const gameInit = async (id, isHost) => {
  const stage = "CREATED";
  let gridRes;

  if (isHost !== undefined) {
    gridRes = await fetchGame(id);
  } else {
    isHost = 1;
    await createGame(id, stage);
    gridRes = await saveGrid(id);
    await createPlayer(id);
  }

  let result = {
    stage,
    gameId: id,
    isHost,
    grid: gridRes.grid,
    turn: gridRes.turn,
    winner: gridRes.winner,
    gridSize: gridRes.gridSize,
  };

  return result;
};

export const gameRefresh = async (id, isHost) => {
  let gridRes = await fetchGame(id);
  let result = {
    stage: gridRes.stage,
    gameId: id,
    isHost,
    grid: gridRes.grid,
    turn: gridRes.turn,
    winner: gridRes.winner,
    gridSize: gridRes.gridSize,
    teamType: gridRes.teamType,
  };
  return result;
};

export const gameStart = async (id, stage, teamType) => {
  let turn = 1;
  let update = await updateGame({ turn, stage, teamType }, id);
  let gridRes = await fetchGame(id);

  let result = {
    stage,
    gameId: id,
    isHost: turn,
    grid: gridRes.grid,
    turn: gridRes.turn,
    winner: gridRes.winner,
    gridSize: gridRes.gridSize,
    teamType: gridRes.teamType,
  };
  return result;
};

export const gamePlaying = async (gameId, stage, cellId, cellValue) => {
  let gridRes = await fetchGame(gameId);

  let newCell = await handleSideStack(gridRes.grid, cellId);
  cellId = newCell;

  let turn = gridRes.turn == 1 ? 0 : 1;
  await updateGame({ turn, stage }, gameId);

  await updateGridCell({ value: cellValue }, gameId, cellId);

  gridRes = await fetchGame(gameId);

  let winner = checkWins(gridRes.grid);

  if (winner.count == -1 || winner.count == 4) {
    await updateGame(
      { turn: null, stage: "COMPLETED", winner: winner.player },
      gameId
    );
    gridRes = await fetchGame(gameId);
    gridRes["selectedCells"] = winner.selectedCells;
    gridRes["count"] = winner.count;
  }

  return gridRes;
};
