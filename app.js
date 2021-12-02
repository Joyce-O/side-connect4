const express = require('express');
const path = require('path');
const url = require('url');
import WebSocket from 'ws';
import { nanoid } from "nanoid";
const { createServer } = require('http');
import { initDBTables } from "./src/db/index";
import { gameInit, gameStart, gamePlaying, gameRefresh } from "./src/controller/gameEvents";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
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

}

const broadCastToSelf = (gameId, message, ws) => {
  clients.get(gameId).forEach((client) => {
    if (client === ws && client.readyState === WebSocket.OPEN) {
      client.send(`${JSON.stringify(message)}`);
    }
  });

}


wss.on('connection', async (ws, req) => {
  let { query: { gameId, isHost } } = url.parse(req.url, true);
  let metadata; 
  if (clients.has(gameId)) {
    clients.get(gameId).push(ws);
    metadata = await gameRefresh(gameId, isHost);
  } else {
    gameId = nanoid();
    clients.set(gameId, [ws]);
    metadata = await gameInit(gameId, isHost);
  }

  broadCastToSelf(gameId, metadata, ws)
  // ws.send(`${JSON.stringify(metadata)}`);

  ws.on('message', async (message) => {
    let formatMsg = JSON.parse(message);

    const { turn, stage, cellId, cellValue, teamType } = formatMsg;
    if (formatMsg.stage === "BEGIN") {
      let game = await gameStart(gameId, turn, stage, teamType);

      broadCastToPair(gameId, game, ws);
    }

    if (stage === "PLAYING") {
      let gamePlay = await gamePlaying(gameId, turn, stage, cellId, cellValue);
      broadCastToPair(gameId, gamePlay, ws)
      if(gamePlay.teamType === "oneTeam"){
        console.log("game type", gamePlay.teamType)
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log('WebSocket client exited!')
  });
});

wss.on('open', () => {
  console.log('WebSocket is open for connection!')
});

wss.on('error', (err) => {
  console.log('WebSocket server connection failed!', err);
});

server.listen(8080, () => {
  initDBTables();
  console.log('Listening on http://localhost:8080');
});