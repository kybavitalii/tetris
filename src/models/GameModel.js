export class GameModel {
    PLAYFIELD_COLUMNS = 10;
    PLAYFIELD_ROWS = 20;
    TETROMINO_EASY = ["DOT", "DABBLE", "O", "L", "RL", "T", "I", "J"];
    TETROMINO_MIDDLE = ["DOT", "DABBLE", "O", "L", "RL", "T", "I", "J", "S", "Z"];
    TETROMINO_HARD = ["DOT", "DABBLE", "O", "L", "RL", "T", "I", "J", "S", "Z", "BIGT", "X"];
    TETROMINO_NAMES = this.TETROMINO_EASY;
    TETROMINOES = {
        DOT: [[1]],
        DABBLE: [
            [1, 1],
            [0, 0],
        ],
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
        BIGT: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 1, 0],
        ],
        X: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
    };
    playField;
    gameTetro;
    tetromino = {};
    score = 0;
    validator;
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

    getValidator() {
        return this.validator;
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

    setValidator(validator) {
        this.validator = validator;
    }

    setTetrominoNames(name) {
        this.TETROMINO_NAMES = name;
    }
}
