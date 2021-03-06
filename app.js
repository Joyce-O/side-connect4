const express = require("express");
const path = require("path");
const url = require("url");
import WebSocket from "ws";
import { nanoid } from "nanoid";
const { createServer } = require("http");
import { initDBTables } from "./src/db/index";
import {
  gameInit,
  gameStart,
  gamePlaying,
  gameRefresh,
} from "./src/controller/gameEvents";
import systemPlayer from "./src/controller/systemPlayer";

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

const server = createServer(app);
const wss = new WebSocket.Server({ server, clientTracking: true });

const clients = new Map();

const broadCastToPair = (gameId, message) => {
  clients.get(gameId).forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`${JSON.stringify(message)}`);
    }
  });
};

const broadCastToSelf = (gameId, message, ws) => {
  clients.get(gameId).forEach((client) => {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      client.send(`${JSON.stringify(message)}`);
    }
  });
};

wss.on("connection", async (ws, req) => {
  let {
    query: { gameId, isHost },
  } = url.parse(req.url, true);
  let metadata;
  if (clients.has(gameId)) {
    clients.get(gameId).push(ws);
    metadata = await gameRefresh(gameId, isHost);
  } else {
    gameId = nanoid();
    clients.set(gameId, [ws]);
    metadata = await gameInit(gameId, isHost);
  }

  broadCastToSelf(gameId, metadata, ws);
  // ws.send(`${JSON.stringify(metadata)}`);

  ws.on("message", async (message) => {
    let formatMsg = JSON.parse(message);

    const { stage, cellId, cellValue, teamType } = formatMsg;
    if (formatMsg.stage === "BEGIN") {
      let game = await gameStart(gameId, stage, teamType);

      broadCastToPair(gameId, game, ws);
    }

    if (stage === "PLAYING") {
      let gamePlay = await gamePlaying(gameId, stage, cellId, cellValue);
      broadCastToPair(gameId, gamePlay, ws);

      if (gamePlay.teamType === "oneTeam" && !gamePlay.winner) {
        gamePlay = await systemPlayer({ stage, gameId, grid: gamePlay.grid });
        broadCastToPair(gameId, gamePlay, ws);
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("WebSocket client exited!");
  });
});

wss.on("open", () => {
  console.log("WebSocket is open for connection!");
});

wss.on("error", (err) => {
  console.log("WebSocket server connection failed!", err);
});

server.listen(PORT, () => {
  initDBTables();
  console.log(`Listening on http://localhost:${PORT}`);
});
