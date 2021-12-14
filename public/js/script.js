import { addMessage } from "./socket.js";
import {checkMiddles} from "./utility.js";

const container = document.getElementById("grid-container");
const startBtn = document.getElementById("button-start");
const modalParent = document.getElementById("modal");
const oneTeamBtn = document.getElementById("oneTeam");
const twoTeamsBtn = document.getElementById("twoTeams");

const clipboard = new ClipboardJS(".copy-btn");
clipboard.on("success", function (e) {
  alert("player 2 link copied");
});

clipboard.on("error", function (e) {
  alert("Error occured while copying player 2 link");
});

const handlePlayerPointer = (player) => {
  player.preventDefault();
  let param = new URLSearchParams(location.search);
  const turn = localStorage.getItem("turn");
  const cellValue = param.get("isHost");

  if(turn != cellValue || (checkMiddles(player.target.id) == false)) return;

  let cellId = player.target.id;
  let stage = localStorage.getItem('stage') || "PLAYING";
  localStorage.removeItem('turn');
  
  addMessage({ cellValue, stage, cellId });
};

const handleGame = async () => {
  modalParent.style.display = "block";
  oneTeamBtn.onclick = function () {
    modalParent.style.display = "none";
    let teamType = "oneTeam";
    let message = { stage: "BEGIN", teamType };

    addMessage(message);
  };

  twoTeamsBtn.onclick = function () {
    modalParent.style.display = "none";
    let teamType = "twoTeams";
    let message = { stage: "BEGIN", teamType };
    addMessage(message);
  };

};



startBtn.addEventListener("click", handleGame);

const buildGrid = (arr) => {
  while (container.firstChild) container.removeChild(container.firstChild); // Remove all children from container div (if any)
  arr.forEach(function (row, colIndex) {
    row.forEach(function (cell, rowIndex) {
      let colorValue, id;

      if (cell.length === 3) {
        id = cell.slice(0, 2);

        colorValue = cell.charAt(cell.length - 1);
      }

      let gridItem = document.createElement("DIV");
      gridItem.className = `grid-item player${colorValue}-cell`;

      gridItem.id = id;
      gridItem.contentEditable = "true";
      gridItem.onclick = handlePlayerPointer;
      container.append(gridItem);
    });
  });
};

export { buildGrid, handleGame };
