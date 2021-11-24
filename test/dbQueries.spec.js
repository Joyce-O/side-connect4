import '@babel/polyfill';
import { expect } from 'chai';
import { nanoid } from "nanoid";
import { createGame, createPlayer, updateGame, updateGridCell, fetchGame, saveGrid } from "../src/db/queries";

let checkRes;
let gameId = nanoid();
let stage;
describe("Database queries", function () {

    it('should create a new game', async function (done) {
        stage = "CREATED";
        checkRes = Promise.resolve(createGame(gameId, stage));
        done();
        expect(checkRes).to.be.an('array');
    });

    it('should create pair of players', async function (done) {
        gameId = nanoid();
        checkRes = Promise.resolve(createPlayer(gameId));
        done();
        expect(checkRes).to.be.an('array');
    });

    it('should save newly created game grid', async function (done) {
        gameId = nanoid();
        checkRes = Promise.resolve(saveGrid(gameId));
        done();
        expect(checkRes).to.be.an('array');
    });

    it('should fetch an existing game', async function (done) {
        gameId = nanoid();
        checkRes = Promise.resolve(fetchGame(gameId));
        done();
        expect(checkRes).to.be.an('array');
    });

    it('should update a game', async function (done) {
        gameId = nanoid();
        checkRes = Promise.resolve(updateGame({ stage: "Playing" }, gameId));
        done();
        expect(checkRes).to.be.an('array');
    });

    it('should update a grid cell', async function (done) {
        gameId = nanoid();
        checkRes = Promise.resolve( updateGridCell(1, gameId, "00"));
        done();
        expect(checkRes).to.be.an('array');
        
    });

})