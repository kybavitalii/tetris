import { GameView } from "../view/GameView";
import { FilledRows } from "./FilledRows";

export class GameController {
    gameFieldGenerator;
    gameField;
    gameTetromino;
    gameTetro;
    timeOutId;
    requestId;
    isPaused = false;
    isGameOver = false;

    constructor(model) {
        this.model = model;
        this.view = new GameView(this.model, this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.down = this.down.bind(this);
        this.controlsTetro = this.view.getControlsTetro();
        this.finderFilledRows = new FilledRows(this.model, this);
    }

    initGame() {
        // gameOverBlock.style.display = "none";
        this.isGameOver = false;
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
        this.startGame();
    }

    down() {
        this.controlsTetro.moveTetrominoDown();
        this.view.draw();
        this.stopGame();
        this.startGame();
        if (this.isGameOver) {
            this.gameOver();
        }
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
        if (event.key === "Enter") {
            this.togglePauseGame();
        }
        if (this.isPaused) return;
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
                this.controlsTetro.dropTetrominoDown();
                break;
        }
        this.finderFilledRows.find();
        this.view.displayScore(this.model.getScore());
        this.view.draw();
    }

    togglePauseGame() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.stopGame();
        } else {
            this.startGame();
        }
    }

    gameOver() {
        const gameOverBlock = document.querySelector(".game-over");
        this.stopGame();
        gameOverBlock.style.display = "flex";
    }

    startGame() {
        this.timeOutId = setTimeout(() => (this.requestId = requestAnimationFrame(this.down)), 1000);
    }

    stopGame() {
        cancelAnimationFrame(this.requestId);
        this.timeOutId = clearTimeout(this.timeOutId);
    }
}
