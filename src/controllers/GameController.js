import { GameView } from "../view/GameView";

export class GameController {
    constructor(model) {
        this.model = model;
        this.view = new GameView(this.model, this);
        this.gameFieldGenerator = this.view.getFieldGenerator();
        this.gameTetromino = this.view.getGameTetromino();
    }

    initGame() {
        this.gameFieldGenerator.generate();
        this.gameFieldGenerator.draw();
        this.gameTetromino.generate();
        this.gameTetromino.draw();
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
