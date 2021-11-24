import { expect } from 'chai';
import {checkWins, handleArrDimension} from "../src/controller/checkWins";
import {getGrid, getMaxArr} from "./gridSamples";

let checkRes;
describe("Game handlers", function () {
    describe("Handle all grid dimensions (column,row,diagonal)", function () {

        it("should return an array of grid dimensions", function () {
            checkRes = handleArrDimension(getGrid());
            expect(checkRes).to.be.an('array').to.deep.equal(getMaxArr());
        })

        it("should return an array of grid dimensions of length 39", function () {
            checkRes = handleArrDimension(getGrid());
            expect(checkRes).to.be.an('array').lengthOf(39);
        });

    });


    describe("Calculate player with maximum number of row count", function () {
        it("should return zero count for no win", function () {
            checkRes = checkWins(getGrid());
            expect(checkRes).to.deep.equal({ count: 0, player: undefined, selectedCells: [] });
        })

        it("should return an object", function () {
            checkRes = checkWins(getGrid());
            expect(checkRes).to.be.an('object');
        })

        it("should return count equals to 4 for a win", function () {
            checkRes = checkWins(getGrid("col-win"));
            expect(checkRes.count).to.equal(4);
        })
    });
})