import { GameView } from "../view/GameView";
import { FilledRows } from "./FilledRows";
import { SetDifficulties } from "./SetDifficulties";

export class GameController {
    gameFieldGenerator;
    gameField;
    gameTetromino;
    timeOutId;
    requestId;
    speed = 800;
    isPaused = false;
    isGameOver = false;
    btnRestart = document.querySelector(".restart");
    gameOverBlock = document.querySelector(".game-over");

    constructor(model) {
        this.model = model;
        this.view = new GameView(this.model, this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.down = this.down.bind(this);
        this.initGame = this.initGame.bind(this);
        this.controlsTetro = this.view.getControlsTetro();
        this.setDifficulties = new SetDifficulties(this.model, this);
        this.finderFilledRows = new FilledRows(this.model, this);
        this.btnRestart.addEventListener("click", this.initGame);
    }

    resetGame(gameFieldGenerator) {
        this.model.TETROMINO_NAMES = this.model.TETROMINO_EASY;
        this.model.setScore(0);
        this.setDifficulties.compute(this.model.getScore(), this.speed);
        this.speed = this.setDifficulties.speed;
        this.gameOverBlock.style.display = "none";
        this.isGameOver = false;
        gameFieldGenerator.reset();
        this.model.setPlayField([]);
    }

    initGame() {
        this.gameFieldGenerator = this.view.getFieldGenerator();
        this.resetGame(this.gameFieldGenerator);
        this.gameTetromino = this.view.getGameTetromino();
        this.gameField = this.gameFieldGenerator.generate();
        this.model.setPlayField(this.gameField);
        this.gameFieldGenerator.draw();
        this.gameTetromino.generate();
        this.gameTetromino.draw();
        this.model.setGameTetro(this.gameTetromino);
        this.view.displayScore(this.model.getScore());
        document.addEventListener("keydown", this.onKeyDown, false);
        this.startGame();
    }

    down() {
        this.finderFilledRows.find();
        this.view.displayScore(this.model.getScore());
        this.setDifficulties.compute(this.model.getScore(), this.speed);
        this.speed = this.setDifficulties.speed;
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
        this.view.draw();
    }

    togglePauseGame() {
        this.isPaused = !this.isPaused;
        this.isPaused ? this.stopGame() : this.startGame();
    }

    gameOver() {
        this.stopGame();
        this.gameOverBlock.style.display = "flex";
    }

    startGame() {
        this.timeOutId = setTimeout(() => (this.requestId = requestAnimationFrame(this.down)), this.speed);
    }

    stopGame() {
        cancelAnimationFrame(this.requestId);
        this.timeOutId = clearTimeout(this.timeOutId);
    }
}
