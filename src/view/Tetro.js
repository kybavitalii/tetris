import { RandomGenerator } from "../models/RandomGenerator";
import { RandomColor } from "./RandomColor";
import { ConvertPositionToIndex } from "../models/ConvertPositionToIndex";

export class Tetro {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
        this.convertorPositionToIndex = new ConvertPositionToIndex();
    }

    randomTetromino() {
        const amount = this.model.TETROMINO_NAMES.length;
        const randomtetro = new RandomGenerator(0, amount).getRandom();
        return this.model.TETROMINO_NAMES[randomtetro];
    }

    generate() {
        const startPosition = -2;
        const nameTetro = this.randomTetromino();
        const matrixTetro = this.model.TETROMINOES[nameTetro];
        const rowTetro = startPosition;
        const columnTetro = this.centeringTetromino(this.model.getColumns(), matrixTetro.length);
        const colorTetro = new RandomColor().getColor();
        return this.model.setTetromino({
            name: nameTetro,
            matrix: matrixTetro,
            row: rowTetro,
            column: columnTetro,
            color: colorTetro,
        });
    }

    draw() {
        const name = this.model.getTetromino().name;
        const color = this.model.getTetromino().color;
        const tetrominoMatrixSize = this.model.getTetromino().matrix.length;
        const cells = this.model.getCells();
        for (let row = 0; row < tetrominoMatrixSize; row++) {
            for (let column = 0; column < tetrominoMatrixSize; column++) {
                if (this.model.getTetromino().matrix[row][column] === 0) continue;
                if (this.model.getTetromino().row + row < 0) continue;

                const cellIndex = this.convertorPositionToIndex.getIndex(
                    this.model.getTetromino().row + row,
                    this.model.getColumns(),
                    this.model.getTetromino().column + column
                );
                cells[cellIndex].classList.add(name);
                cells[cellIndex].style.setProperty("--color-tetromino", color);
            }
        }
    }

    centeringTetromino(columns, length) {
        return Math.floor((columns - length) / 2);
    }

    placeTetromino() {
        const tetromino = this.model.getTetromino();
        const playField = this.model.getPlayField();
        const matrixSize = tetromino.matrix.length;
        const validator = this.model.getValidator();
        for (let row = 0; row < matrixSize; row++) {
            for (let column = 0; column < matrixSize; column++) {
                if (!tetromino.matrix[row][column]) continue;
                if (validator.isOutsideTopBoard(row)) {
                    this.controller.isGameOver = true;
                    return;
                }
                playField[tetromino.row + row][tetromino.column + column] = tetromino.name;
            }
        }
        this.generate();
    }
}
