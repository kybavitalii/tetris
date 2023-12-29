import { GameView } from "../view/GameView";

export class GameController {
    gameFieldGenerator;
    gameField;
    gameTetromino;
    gameTetro;
    // tetromino;
    constructor(model) {
        this.model = model;
        this.view = new GameView(this.model, this);
        // this.down = this.down.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.controlsTetro = this.view.getControlsTetro();
        // this.gameFieldGenerator = this.view.getFieldGenerator();
        // this.gameTetromino = this.view.getGameTetromino();
        // this.tetromino = new Tetromino(this.model, this);
    }

    // getGameTetromino() {
    //     return this.gameTetromino;
    // }

    initGame() {
        this.gameFieldGenerator = this.view.getFieldGenerator();
        this.gameTetromino = this.view.getGameTetromino();

        // console.log(this.gameTetromino);
        this.gameField = this.gameFieldGenerator.generate();
        this.model.setPlayField(this.gameField);
        this.gameFieldGenerator.draw();
        this.gameTetromino.generate();
        this.gameTetromino.draw();
        this.gameTetro = this.view.getGameTetromino();
        this.model.setGameTetro(this.gameTetro);
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
        // this.view.getGameTetromino().draw();
        this.view.draw();
        //     GameView.draw()
    }

    // startGame() {
    //     isStarted = true;
    //     timerId = setInterval(() => autoMove(), 1000);
    // }
    //
    // pauseGame() {
    //     isStarted = false;
    //     clearInterval(timerId);
    // }
    //
    // moveTetrominoDown() {
    //     if (isStarted) {
    //         tetromino.row += 1;
    //     }
    //     if (isValid()) {
    //         tetromino.row -= 1;
    //         placeTetromino();
    //     }
    // }
    //
    // moveTetrominoLeft() {
    //     if (isStarted) {
    //         tetromino.column -= 1;
    //     }
    //     if (isValid()) {
    //         tetromino.column += 1;
    //     }
    // }
    //
    // moveTetrominoRight() {
    //     if (isStarted) {
    //         tetromino.column += 1;
    //     }
    //     if (isValid()) {
    //         tetromino.column -= 1;
    //     }
    // }
}
