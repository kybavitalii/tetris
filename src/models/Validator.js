export class Validator {
    tetromino;
    playField;
    constructor(model) {
        this.model = model;
    }

    isValid() {
        this.tetromino = this.model.getTetromino();
        this.playField = this.model.getPlayField();
        console.log(this.playField);
        const matrixSize = this.tetromino.matrix.length;
        for (let row = 0; row < matrixSize; row++) {
            for (let column = 0; column < matrixSize; column++) {
                if (!this.tetromino.matrix[row][column]) {
                    continue;
                }
                if (this.isOutsideOfGameBoard(row, column)) {
                    return true;
                }
                if (this.hasCollisions(row, column)) {
                    return true;
                }
            }
        }
        return false;
    }

    isOutsideOfGameBoard(row, column) {
        console.log(this.model.getPlayField());
        return (
            this.tetromino.column + column < 0 ||
            this.tetromino.column + column >= this.model.getColumns() ||
            this.tetromino.row + row >= this.model.getPlayField().length
        );
    }

    hasCollisions(row, column) {
        return this.playField[this.tetromino.row + row]?.[this.tetromino.column + column];
    }
}
