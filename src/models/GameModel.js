export class GameModel {
    PLAYFIELD_COLUMNS = 10;
    PLAYFIELD_ROWS = 20;
    TETROMINO_NAMES = ["O", "L", "RL", "J", "S", "Z", "T", "I"];
    TETROMINOES = {
        O: [
            [1, 1],
            [1, 1],
        ],
        L: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        RL: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1],
        ],
        J: [
            [1, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ],
        S: [
            [0, 1, 1],
            [0, 1, 0],
            [1, 1, 0],
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        T: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0],
        ],
        I: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    };
    playField;
    gameTetro;
    tetromino = {};
    score = 0;
    constructor() {}

    getRows() {
        return this.PLAYFIELD_ROWS;
    }

    getColumns() {
        return this.PLAYFIELD_COLUMNS;
    }

    getPlayField() {
        return this.playField;
    }

    getCells() {
        return document.querySelectorAll(".tetris div");
    }

    getTetromino() {
        return this.tetromino;
    }

    getGameTetro() {
        return this.gameTetro;
    }

    getScore() {
        return this.score;
    }

    setPlayField(playfield) {
        this.playField = playfield;
    }

    setTetromino(tetromino) {
        this.tetromino = tetromino;
    }

    setGameTetro(tetro) {
        this.gameTetro = tetro;
    }

    setScore(score) {
        this.score = score;
    }
}
