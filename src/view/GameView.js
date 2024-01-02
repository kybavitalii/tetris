import { GameFieldGenerator } from "./GameFieldGenerator";
import { Tetro } from "./Tetro";
import { ControlsTetro } from "./ControlsTetro";

export class GameView {
    gameTetromino;
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.gameFieldGenerator = new GameFieldGenerator(this.model);
        this.controlsTetro = new ControlsTetro(this.model, this.controller);
        this.gameTetromino = new Tetro(this.model, this.controller, this);
    }

    getControlsTetro() {
        return this.controlsTetro;
    }

    getGameTetromino() {
        return this.gameTetromino;
    }

    getFieldGenerator() {
        return this.gameFieldGenerator;
    }

    displayScore(score, next) {
        const scoreArea = document.getElementById("messageAreaScore");
        scoreArea.innerHTML = `Score: ${score}, Next: ${next}`;
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
