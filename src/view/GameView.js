import { GameFieldGenerator } from "./GameFieldGenerator";
import { Tetromino } from "./Tetromino";

export class GameView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.gameFieldGenerator = new GameFieldGenerator(this.model);
        this.gameTetromino = new Tetromino(this.model, this.controller);
    }

    getGameTetromino() {
        return this.gameTetromino;
    }

    getFieldGenerator() {
        return this.gameFieldGenerator;
    }

    displayScore(score) {
        const scoreArea = document.getElementById("messageAreaScore");
        scoreArea.innerHTML = score;
    }

    draw() {
        const cells = this.model.getCells();
        cells.forEach(function (cell) {
            cell.removeAttribute("class");
        });
        this.gameFieldGenerator.draw();
        this.gameTetromino.draw();
    }
}
