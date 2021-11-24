import { playing, completed, created, begin, resetGame } from './utility.js';

let param = new URLSearchParams(location.search);
const HOST = location.origin.replace(/^http/, 'ws');
const websocket = new WebSocket(`${HOST}?${param}`);

websocket.onopen = function (evt) { onOpen(evt) };
websocket.onclose = function (evt) { onClose(evt) };
websocket.onmessage = function (evt) { onMessage(evt) };
websocket.onerror = function (evt) { onError(evt) };


const onOpen = (evt) => {
  console.log("websocket client opened!", evt)
}

const onClose = (evt) => {
  console.log("websocket client closed!")
}

const onMessage = (evt) => {
  let message = evt.data;
  message = JSON.parse(message);
  const { stage, grid, gameId, isHost, turn, winner, gridSize } = message;

  if (stage && stage === "CREATED") {
    created(grid, gameId, isHost)
  }

  if (stage && stage === "BEGIN") {
    begin(stage, turn, grid)

  }

  if (stage && stage === "PLAYING") {
    playing(turn, grid, winner)

  }

  if (stage && stage === "PLAYING") {
    playing(turn, grid, winner)

  }

  if (stage && stage === "COMPLETED") {
    completed(grid, winner, stage)

  }

}

const onError = (evt) => {
  console.log("websocket client failed!", evt);
}

const addMessage = (msg) => {
  let stage = localStorage.getItem('stage') || msg.stage;

  if (stage === "BEGIN") {
    msg.turn = param.get('isHost') == 1 ? 1 : 0;
  }

  if (stage == "COMPLETED") {
    resetGame();
  }

  websocket.send(JSON.stringify(msg));

}
export { addMessage };