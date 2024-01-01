import { Validator } from "../models/Validator";

export class ControlsTetro {
    tetromino;
    tetro;
    constructor(model, controller, view) {
        this.model = model;
        this.controller = controller;
        this.view = view;
        this.validator = new Validator(this.model);
    }

    refreshTetromino() {
        this.tetromino = this.model.getTetromino();
        this.tetro = this.model.getGameTetro();
    }

    dropTetrominoDown() {
        this.refreshTetromino();
        while (!this.validator.isValid()) {
            this.tetromino.row++;
        }
        this.tetromino.row--;
    }

    moveTetrominoDown() {
        this.refreshTetromino();
        this.tetromino.row += 1;
        if (this.validator.isValid()) {
            this.tetromino.row -= 1;
            this.tetro.placeTetromino();
        }
    }

    moveTetrominoLeft() {
        this.refreshTetromino();
        this.tetromino.column -= 1;
        if (this.validator.isValid()) {
            this.tetromino.column += 1;
        }
    }

    moveTetrominoRight() {
        this.refreshTetromino();
        this.tetromino.column += 1;
        if (this.validator.isValid()) {
            this.tetromino.column -= 1;
        }
    }

    rotateTetromino() {
        this.refreshTetromino();
        const oldMatrix = this.tetromino.matrix;
        this.tetromino.matrix = this.rotateMatrix(this.tetromino.matrix);
        if (this.validator.isValid()) {
            this.tetromino.matrix = oldMatrix;
        }
    }

    rotateMatrix(matrixTetromino) {
        this.refreshTetromino();
        const N = this.tetromino.matrix.length;
        const rotateMatrix = [];
        for (let i = 0; i < N; i++) {
            rotateMatrix[i] = [];
            for (let j = 0; j < N; j++) {
                rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
            }
        }
        return rotateMatrix;
    }
}
