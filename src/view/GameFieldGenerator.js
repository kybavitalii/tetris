export class GameFieldGenerator {
    constructor(rows, columns, playField) {
        this.rows = rows;
        this.columns = columns;
        this.playField = playField;
    }

    generate() {
        for (let i = 0; i < this.rows * this.columns; i++) {
            const div = document.createElement("div");
            document.querySelector(".tetris").append(div);
        }

        this.playField = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
    }

    draw() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const name = this.playField[row][column];
                const cellIndex = this.convertPositionToIndex(row, column);
                this.getCells[cellIndex].classList.add(name);
            }
        }
    }

    convertPositionToIndex(row, column) {
        return row * this.rows + column;
    }

    getCells() {
        return document.querySelectorAll(".tetris div");
    }
}
