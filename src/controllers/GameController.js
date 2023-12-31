import { GameView } from "../view/GameView";
import { FilledRows } from "./FilledRows";

export class GameController {
    gameFieldGenerator;
    gameField;
    gameTetromino;
    gameTetro;

    constructor(model) {
        this.model = model;
        this.view = new GameView(this.model, this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.controlsTetro = this.view.getControlsTetro();
        this.finderFilledRows = new FilledRows(this.model, this);
    }

    initGame() {
        this.gameFieldGenerator = this.view.getFieldGenerator();
        this.gameTetromino = this.view.getGameTetromino();
        this.gameField = this.gameFieldGenerator.generate();
        this.model.setPlayField(this.gameField);
        this.gameFieldGenerator.draw();
        this.gameTetromino.generate();
        this.gameTetromino.draw();
        this.gameTetro = this.view.getGameTetromino();
        this.model.setGameTetro(this.gameTetro);
        this.view.displayScore(this.model.getScore());
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    down() {
        this.controlsTetro.moveTetrominoDown();
    }

    left() {
        this.controlsTetro.moveTetrominoLeft();
    }

    right() {
        this.controlsTetro.moveTetrominoRight();
    }

    rotate() {
        this.controlsTetro.rotateTetromino();
    }

    onKeyDown(event) {
        switch (event.key) {
            case "ArrowDown":
                this.down();
                break;
            case "ArrowLeft":
                this.left();
                break;
            case "ArrowRight":
                this.right();
                break;
            case "ArrowUp":
                this.rotate();
                break;
            case " ":
                // toggleGame();
                break;
        }
        this.finderFilledRows.find();
        this.view.displayScore(this.model.getScore());
        this.view.draw();
    }
}
