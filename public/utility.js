import { buildGrid } from "./script.js";
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const playerTurn = document.getElementById("player-turn");
const startBtn = document.getElementById("button-start");
const resetBtn = document.getElementById("button-reset");


let newRelativePathQuery;
let param = new URLSearchParams(location.search);

export const gameOn = (game, isHost) => {
    if (!param || JSON.stringify(param) == '{}') {
        param.set("isHost", isHost)
        param.set("gameId", game)
        newRelativePathQuery = window.location.pathname + '?' + param.toString();
        history.pushState(null, '', newRelativePathQuery);
    }
}

export const created = (grid, gameId, isHost) => {
    buildGrid(grid);
    if (!param.get('gameId')) {
        gameOn(gameId, isHost);
        let link = `${window.location.origin}/?gameId=${gameId}&isHost=0`;
        document.getElementById('player2-link').value = link
    };
}


export const begin = (stage, turn, grid) => {
    buildGrid(grid);
    startBtn.disabled = true;
    startBtn.style.opacity = 0.5;
    document.getElementById("grid-container").classList.add("container-started");

    if (turn == 1) {
        playerTurn.innerHTML = "Host's turn";
    } else {
        playerTurn.innerHTML = "Opponent's turn";
    }
};

export function playing(turn, grid, winner, stage) {
    buildGrid(grid);
    if (turn == 1) {
        playerTurn.innerHTML = "Host's turn";
    } else {
        playerTurn.innerHTML = "Opponent's turn";
    }
}

export function displayWin(winner, grid, stage) {
    //TODO: show winning cells

    playerTurn.style.color = "red";
    if ((winner.count == -1)) {
        playerTurn.innerHTML = "Draw Match and Game Over!!!";
    }
    if (winner == 1) {
        player1.innerHTML = "player 1 WON!";
        player2.innerHTML = "player 2 lost!";
        playerTurn.innerHTML = "Game Over!";
    } else {
        player2.innerHTML = "player 2 WON!";
        player1.innerHTML = "player 1 lost!";
        playerTurn.innerHTML = "Game Over!";
    }
}
export function completed(grid, winner, stage) {
    localStorage.setItem("stage", stage);
    if (stage == "COMPLETED") {
        displayWin(winner, grid, stage);
        buildGrid(grid);
    }

}

export const resetGame = (evt) => {
    param = new URLSearchParams(location.search);
    param.delete("isHost");
    param.delete('gameId');
    localStorage.removeItem('stage');
    newRelativePathQuery = window.location.pathname;
    history.pushState(null, '', newRelativePathQuery);

    if (evt.target) {
        location.reload();
    }
};

resetBtn.addEventListener("click", resetGame);