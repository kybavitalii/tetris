import { GameFieldGenerator } from "./GameFieldGenerator";

export class GameView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.gameFieldGenerator = new GameFieldGenerator(this.model.getRows, this.model.getColumns, this.model.getPlayField);
    }

    displayScore(score) {
        const scoreArea = document.getElementById("messageAreaScore");
        scoreArea.innerHTML = score;
    }
}
