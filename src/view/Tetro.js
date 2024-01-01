import { RandomGenerator } from "../models/RandomGenerator";
import { RandomColor } from "./RandomColor";
import { ConvertPositionToIndex } from "../models/ConvertPositionToIndex";

export class Tetro {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;
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
        const name = this.model.tetromino.name;
        const color = this.model.tetromino.color;
        const tetrominoMatrixSize = this.model.tetromino.matrix.length;
        const cells = this.model.getCells();
        for (let row = 0; row < tetrominoMatrixSize; row++) {
            for (let column = 0; column < tetrominoMatrixSize; column++) {
                if (this.model.tetromino.matrix[row][column] === 0) continue;
                if (this.model.tetromino.row + row < 0) continue;

                const cellIndex = new ConvertPositionToIndex( //кожну ітерацію новий інстанс
                    this.model.tetromino.row + row,
                    this.model.getColumns(),
                    this.model.tetromino.column + column
                ).getIndex();
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
                playField[tetromino.row + row][tetromino.column + column] = this.model.TETROMINO_NAMES[0];
            }
        }
        this.generate();
    }
}
